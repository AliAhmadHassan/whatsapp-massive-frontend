import { Lote } from './../../model/lote.model';
import { WHATSAPPMASSIVE_API } from './../whats-app-massive.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoteService {

  constructor(private http: HttpClient) { }

    createOrUpdate(lote:Lote){
    
    console.log('entrou em createOrUpdate(lote:Lote)');
    if(lote.id != null && lote.id != 0){
      console.log(`Chamando put: ${WHATSAPPMASSIVE_API}/api/lote`);
      return this.http.put(`${WHATSAPPMASSIVE_API}/api/lote`, lote);
    } else{
      lote.id = 0;
      console.log(`Chamando post: ${WHATSAPPMASSIVE_API}/api/lote`);
      return this.http.post(`${WHATSAPPMASSIVE_API}/api/lote`, lote);
    }
  }

  findAll(page: number, count: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/lote/${page}/${count}`)
  }

  findByCampanhaId(page: number, count: number, campanhaId: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/lote/${page}/${count}/${campanhaId}/campanhaId`)
  }

  findByEmpresaId(page: number, count: number, empresaId: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/lote/${page}/${count}/${empresaId}/empresaId`)
  }

  findById(id: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/lote/${id}`)
  }

  delete(id: number){
    return this.http.delete(`${WHATSAPPMASSIVE_API}/api/lote/${id}`)
  }
}
