import { HttpClient } from '@angular/common/http';
import { WHATSAPPMASSIVE_API } from './../whats-app-massive.api';
import { Contato } from './../../model/contato.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ContatoService {

  constructor(private http: HttpClient) { }


    createOrUpdate(contato:Contato){
    
    console.log('entrou em createOrUpdate(contato:Contato)');
    if(contato.id != null && contato.id != 0){
      console.log(`Chamando put: ${WHATSAPPMASSIVE_API}/api/contato`);
      return this.http.put(`${WHATSAPPMASSIVE_API}/api/contato`, contato);
    } else{
      contato.id = 0;
      console.log(`Chamando post: ${WHATSAPPMASSIVE_API}/api/contato`);
      return this.http.post(`${WHATSAPPMASSIVE_API}/api/contato`, contato);
    }
  }

  findAll(page: number, count: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/contato/${page}/${count}`);
  }

  findById(id: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/contato/${id}`);
  }

  findByLoteId(loteId: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/contato/${loteId}/loteId`);
  }

  delete(id: number){
    return this.http.delete(`${WHATSAPPMASSIVE_API}/api/contato/${id}`);
  }

  getContatos(loteId: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/contato/${loteId}/loteId`);
  }

  loteParaEnvio(loteId: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/contato/${loteId}/loteParaEnvio`);
  }

  setEnviadoProcedure(loteId: number, id: number){
    return this.http.put(`${WHATSAPPMASSIVE_API}/api/contato/${loteId}/${id}/setEnvio`, null);
  }

  setSingleCheck(loteId: number, id: number){
    return this.http.put(`${WHATSAPPMASSIVE_API}/api/contato/${loteId}/${id}/setSingleCheck`, null);
  }
  
  setDoubleCheck(loteId: number, id: number){
    return this.http.put(`${WHATSAPPMASSIVE_API}/api/contato/${loteId}/${id}/setDoubleCheck`, null);
  }
}
