import { WHATSAPPMASSIVE_API } from './../whats-app-massive.api';
import { Mensagem } from './../../model/mensagem.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MensagemService {

  constructor(private http: HttpClient) { }

    createOrUpdate(mensagem:Mensagem){
    
    console.log('entrou em createOrUpdate(mensagem:Mensagem)');
    if(mensagem.id != null && mensagem.id != 0){
      console.log(`Chamando put: ${WHATSAPPMASSIVE_API}/api/mensagem`);
      return this.http.put(`${WHATSAPPMASSIVE_API}/api/mensagem`, mensagem);
    } else{
      mensagem.id = 0;
      console.log(`Chamando post: ${WHATSAPPMASSIVE_API}/api/mensagem`);
      return this.http.post(`${WHATSAPPMASSIVE_API}/api/mensagem`, mensagem);
    }
  }

  findAll(page: number, count: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/mensagem/${page}/${count}`)
  }

  findById(id: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/mensagem/${id}`)
  }

  findByEmpresaId(empresaId: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/mensagem/${empresaId}/empresaId`)
  }

  delete(id: number){
    return this.http.delete(`${WHATSAPPMASSIVE_API}/api/mensagem/${id}`)
  }
}
