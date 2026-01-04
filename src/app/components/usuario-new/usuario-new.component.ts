import { Empresa } from './../../model/empresa.model';
import { ResponseApi } from './../../model/response-api';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../model/usuario.model';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-usuario-new',
  templateUrl: './usuario-new.component.html',
  styleUrls: ['./usuario-new.component.css']
})
export class UsuarioNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm;

  id: number;
  usuario = new Usuario(0, '', '', '', '', '', null);
  shared: SharedService;
  message: {};
  classCss: {};
  constructor(
    private usuarioService: UsuarioService,
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
  }

  register() {
    this.message = {};
    this.usuario.empresa = this.shared.empresa;
    this.usuarioService.createOrUpdate(this.usuario).subscribe((responseApi: ResponseApi) => {
      this.usuario = new Usuario(0, '', '', '', '', '', null);
      let userRet: Usuario = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registered ${userRet.nome} successfully`
      });

    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  findById(id: number){
    this.usuarioService.findById(id).subscribe((responseApi: ResponseApi) =>{
      this.usuario = responseApi.data;
    }, err =>{
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      })
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
