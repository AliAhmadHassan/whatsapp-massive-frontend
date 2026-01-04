import { WHATSAPPMASSIVE_API } from './../whats-app-massive.api';
import { ContatoStatus } from './../../model/contato-status.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ContatoStatusService {

  constructor(private http: HttpClient) { }

    createOrUpdate(contatoStatus:ContatoStatus){
    
    console.log('entrou em createOrUpdate(contatoStatus:ContatoStatus)');
    if(contatoStatus.id != null && contatoStatus.id != 0){
      console.log(`Chamando put: ${WHATSAPPMASSIVE_API}/api/contatoStatus`);
      return this.http.put(`${WHATSAPPMASSIVE_API}/api/contatoStatus`, contatoStatus);
    } else{
      contatoStatus.id = 0;
      console.log(`Chamando post: ${WHATSAPPMASSIVE_API}/api/usuario`);
      return this.http.post(`${WHATSAPPMASSIVE_API}/api/contatoStatus`, contatoStatus);
    }
  }

  findAll(page: number, count: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/contatoStatus/${page}/${count}`)
  }

  findByEmpresaId(page: number, count: number, empresaId: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/contatoStatus/${page}/${count}/${empresaId}/empresaId`)
  }

  findById(id: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/contatoStatus/${id}`)
  }

  delete(id: number){
    return this.http.delete(`${WHATSAPPMASSIVE_API}/api/contatoStatus/${id}`)
  }
}
