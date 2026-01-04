import { Empresa } from './../model/empresa.model';
import { UsuarioService } from './usuario/usuario.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../model/usuario.model';

@Injectable()
export class SharedService {

  public static instance: SharedService = null;
  usuario : Usuario;
  token: string;
  empresa: Empresa;
  showTemplate = new EventEmitter<boolean>();

  constructor() { 
    return SharedService.instance = SharedService.instance || this;
  }

  public static getInstance(){
    if(this.instance == null){
      this.instance = new SharedService();
    }
    return this.instance;
  }

  isLoggedIn():boolean {
    if(this.usuario == null){
      return false;
    }
    return this.usuario.email != '';
  }

}