import { WHATSAPPMASSIVE_API } from './../whats-app-massive.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../model/usuario.model';

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) { }

  login(usuario: Usuario){
    return this.http.post(`${WHATSAPPMASSIVE_API}/api/auth`, usuario);
  }

    createOrUpdate(usuario:Usuario){
    
    console.log('entrou em createOrUpdate(usuario:Usuario)');
    if(usuario.id != null && usuario.id != 0){
      console.log(`Chamando put: ${WHATSAPPMASSIVE_API}/api/usuario`);
      return this.http.put(`${WHATSAPPMASSIVE_API}/api/usuario`, usuario);
    } else{
      usuario.id = 0;
      console.log(`Chamando post: ${WHATSAPPMASSIVE_API}/api/usuario`);
      return this.http.post(`${WHATSAPPMASSIVE_API}/api/usuario`, usuario);
    }
  }

  findAll(page: number, count: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/usuario/${page}/${count}`)
  }

  findByEmpresaId(page: number, count: number, empresaId: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/usuario/${page}/${count}/${empresaId}/empresaId`)
  }

  findById(id: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/usuario/${id}`)
  }

  delete(id: number){
    return this.http.delete(`${WHATSAPPMASSIVE_API}/api/usuario/${id}`)
  }
}
