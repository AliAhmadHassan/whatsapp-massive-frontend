import { WHATSAPPMASSIVE_API } from './../whats-app-massive.api';
import { HttpClient } from '@angular/common/http';
import { ContatoImportar } from './../../model/ContatoImportar.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContatoImportarService {

  constructor(private http: HttpClient) { }


    createOrUpdate(contatoImportar:ContatoImportar){
    
    console.log('entrou em createOrUpdate(contatoImportar:ContatoImportar)');
    if(contatoImportar.id != null && contatoImportar.id != 0){
      console.log(`Chamando put: ${WHATSAPPMASSIVE_API}/api/contatoImportar`);
      return this.http.put(`${WHATSAPPMASSIVE_API}/api/contatoImportar`, contatoImportar);
    } else{
      contatoImportar.id = 0;
      console.log(`Chamando post: ${WHATSAPPMASSIVE_API}/api/contatoImportar`);
      return this.http.post(`${WHATSAPPMASSIVE_API}/api/contatoImportar`, contatoImportar);
    }
  }

  findById(id: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/contatoImportar/${id}`);
  }

  findByLoteId(loteId: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/contatoImportar/${loteId}/loteId`);
  }

  delete(id: number){
    return this.http.delete(`${WHATSAPPMASSIVE_API}/api/contatoImportar/${id}`);
  }
}
