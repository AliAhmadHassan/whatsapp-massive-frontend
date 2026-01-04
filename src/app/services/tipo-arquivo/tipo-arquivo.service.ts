import { WHATSAPPMASSIVE_API } from './../whats-app-massive.api';
import { TipoArquivo } from './../../model/tipo-arquivo.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TipoArquivoService {

  constructor(private http: HttpClient) { }

    createOrUpdate(tipoArquivo:TipoArquivo){
    
    console.log('entrou em createOrUpdate(tipoArquivo:TipoArquivo)');
    if(tipoArquivo.id != null && tipoArquivo.id != 0){
      console.log(`Chamando put: ${WHATSAPPMASSIVE_API}/api/tipoArquivo`);
      return this.http.put(`${WHATSAPPMASSIVE_API}/api/tipoArquivo`, tipoArquivo);
    } else{
      tipoArquivo.id = 0;
      console.log(`Chamando post: ${WHATSAPPMASSIVE_API}/api/tipoArquivo`);
      return this.http.post(`${WHATSAPPMASSIVE_API}/api/tipoArquivo`, tipoArquivo);
    }
  }

  findAll(page: number, count: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/tipoArquivo/${page}/${count}`)
  }

  findById(id: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/tipoArquivo/${id}`)
  }

  delete(id: number){
    return this.http.delete(`${WHATSAPPMASSIVE_API}/api/tipoArquivo/${id}`)
  }
}
