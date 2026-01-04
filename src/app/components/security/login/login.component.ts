import { Usuario } from './../../../model/usuario.model';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { CurrentUser } from './../../../model/current-user.model';
import { SharedService } from './../../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario(0, '', '', 'admin@WhatsAppMassive.com', 'WhatsAppMassive123456', '', null);
  shared: SharedService;
  message: string;
  
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { 
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
  }

  login(){
    this.message = '';
    this.usuarioService.login(this.usuario).subscribe((userAuthentication: CurrentUser) => {
      this.shared.token = userAuthentication.token;
      this.shared.usuario = userAuthentication.usuario;
      this.shared.empresa = userAuthentication.usuario.empresa;
      this.shared.usuario.profile = userAuthentication.usuario.profile.substring(5);
      this.shared.showTemplate.emit(true);
      this.router.navigate(['/']);
    }, err => {
      this.shared.token = null;
      this.shared.usuario = null;
      this.shared.showTemplate.emit(false);
      this.message = 'Erro';
    });
  }

  cancelLogin(){
    this.message = '';
    this.usuario = new Usuario(0, '', '', '', '', '', null);
    window.location.href = '/login';
    window.location.reload();
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }
}
