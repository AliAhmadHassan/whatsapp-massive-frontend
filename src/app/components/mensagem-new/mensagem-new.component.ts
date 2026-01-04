import { MensagemService } from './../../services/mensagem/mensagem.service';
import { ResponseApi } from './../../model/response-api';
import { TipoArquivoService } from './../../services/tipo-arquivo/tipo-arquivo.service';
import { Mensagem } from './../../model/mensagem.model';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-mensagem-new',
  templateUrl: './mensagem-new.component.html',
  styleUrls: ['./mensagem-new.component.css']
})
export class MensagemNewComponent implements OnInit {
  @ViewChild("form")
  form: NgForm;

  id: number;
  shared: SharedService;
  message: {};
  classCss: {};
  mensagem = new Mensagem(0, '', '', null);
  listTipoArquivo = [];
  constructor(private tipoArquivoService: TipoArquivoService,
    private mensagemService: MensagemService, 
    private route: ActivatedRoute,
    private router: Router) { 
      this.shared = SharedService.getInstance();
    }

  ngOnInit() {
    console.log("ngOnInit");
    if (this.id != this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];

      if (this.id != undefined) {
        this.findById(this.id);
      }
    }
    this.findAllTipoArquivo();
  }

  register(){
    this.mensagemService.createOrUpdate(this.mensagem).subscribe((responseApi: ResponseApi) => {
      this.mensagem = new Mensagem(0, '', '', null);
      let mensagem : Mensagem = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registered successfully`
      });
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  findById(id: number){
    this.mensagemService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.mensagem = responseApi.data;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  findAllTipoArquivo(){
    this.tipoArquivoService.findAll(0, 1000).subscribe((responseApi: ResponseApi) => {
      this.listTipoArquivo = responseApi['data']['content'];
    }, err =>{
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }
  
  private showMessage(message: {type: string, text :string}):void{
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string):void{
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-'+type] = true;
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

  onFileChange(event): void{
    if(event.target.files[0].size > 5000000){
      this.showMessage({
        type: 'error',
        text: 'Maximum image size is 5 MB'
      });
    } else {
      this.mensagem.caminhoArquivo = '';
      var reader = new FileReader();
      reader.onloadend = (e: Event) => {
        this.mensagem.caminhoArquivo = reader.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
