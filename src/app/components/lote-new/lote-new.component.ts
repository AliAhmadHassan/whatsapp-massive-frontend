import { ResponseApi } from './../../model/response-api';
import { ActivatedRoute, Router } from '@angular/router';
import { LoteService } from './../../services/lote/lote.service';
import { CampanhaService } from './../../services/campanha/campanha.service';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Lote } from '../../model/lote.model';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-lote-new',
  templateUrl: './lote-new.component.html',
  styleUrls: ['./lote-new.component.css']
})
export class LoteNewComponent implements OnInit {
  
  @ViewChild("form")
  form: NgForm;

  id: number;
  listCampanha = [];
  lote = new Lote(0, null, '', null, null, false, 40);
  shared: SharedService;
  message: {};
  classCss: {};
  constructor(
    private campanhaService: CampanhaService,
    private loteService: LoteService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.id != undefined) {
      this.findById(this.id);
    }
    this.findAllCampanha(this.shared.empresa.id);
    this.lote.dtPrevisaoEnvio = new Date();
  }

  findById(id: number){
    this.loteService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.lote = responseApi.data;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  findAllCampanha(empresaId: number){
    this.campanhaService.findByEmpresaId(0, 10000, empresaId).subscribe((responseApi: ResponseApi) =>{
      this.listCampanha = responseApi['data']['content'];
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  register(){
    this.loteService.createOrUpdate(this.lote).subscribe((responseApi: ResponseApi) => {
      this.lote = new Lote(0, null, '', null, null, false, 0);
      let lote : Lote = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registered ${lote.nome} successfully`
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
