import { MensagemService } from './../../services/mensagem/mensagem.service';
import { ResponseApi } from './../../model/response-api';
import { CampanhaService } from './../../services/campanha/campanha.service';
import { Campanha } from './../../model/campanha.model';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Mensagem } from '../../model/mensagem.model';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-campanha-new',
  templateUrl: './campanha-new.component.html',
  styleUrls: ['./campanha-new.component.css']
})
export class CampanhaNewComponent implements OnInit {
  @ViewChild("form")
  form: NgForm;

  id: number;
  listMensagens = [];
  campanha = new Campanha(0, '', '', null, null);
  shared: SharedService;
  message: {};
  classCss: {};
  constructor(
    private campanhaService: CampanhaService,
    private mensagemService: MensagemService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
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
    this.mensagemByEmpresaId(this.shared.empresa.id);
  }

  findById(id: number){
    this.campanhaService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.campanha = responseApi.data;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      })
    });
  }

  register(){
    this.campanhaService.createOrUpdate(this.campanha).subscribe((responseApi: ResponseApi) => {
      this.campanha = new Campanha(0, '', '', null, null);
      let campanha : Campanha = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registered ${campanha.nome} successfully`
      });
    }, err =>{
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }
  
  mensagemByEmpresaId(id: number){
    this.mensagemService.findByEmpresaId(id).subscribe((responseApi: ResponseApi) => {
      this.listMensagens = responseApi['data'];
    }, err =>{
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
  }

  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
      if (message.type == "success") {
        this.router.navigate(['/user-list']);
      }
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-' + type] = true;
  }
}
