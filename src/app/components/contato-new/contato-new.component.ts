import { LoteService } from './../../services/lote/lote.service';
import { CampanhaService } from './../../services/campanha/campanha.service';
import { ContatoStatusService } from './../../services/contato-status/contato-status.service';
import { ResponseApi } from './../../model/response-api';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from './../../services/contato/contato.service';
import { SharedService } from './../../services/shared.service';
import { Contato } from './../../model/contato.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-contato-new',
  templateUrl: './contato-new.component.html',
  styleUrls: ['./contato-new.component.css']
})
export class ContatoNewComponent implements OnInit {
  @ViewChild("form")
  form: NgForm;

  id: number;
  listLotes = [];
  listContatoStatus = [];
  contato = new Contato(0, null, 0, 0, '', '', '', 0, null, null, null, null) ;
  shared: SharedService;
  message: {};
  classCss: {};
  constructor(
    private contatoService: ContatoService,
    private loteService: LoteService,
    private contatoStatusService: ContatoStatusService,
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
  }

  findById(id: number){
    this.contatoService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.contato = responseApi.data;
      this.findAllLoteByEmpresaId(this.shared.empresa.id);
      this.findAllContatoStatus();
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  findAllLoteByEmpresaId(empresaId: number){
    this.loteService.findByEmpresaId(0, 10000, empresaId).subscribe((responseApi: ResponseApi) =>{
      this.listLotes = responseApi['data']['content'];
    }, err =>{
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  findAllContatoStatus(){
    this.contatoStatusService.findAll(0, 10000).subscribe((responseApi: ResponseApi) =>{
      this.listContatoStatus = responseApi['data']['content'];
    }, err =>{
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }


  register(){
    this.contatoService.createOrUpdate(this.contato).subscribe((responseApi: ResponseApi) => {
      this.contato = new Contato(0, null, 0, 0, '', '', '', 0, null, null, null, null) ;
      let contato : Contato = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registered ${contato.ddd} ${contato.numeroTelefone} successfully`
      });
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
