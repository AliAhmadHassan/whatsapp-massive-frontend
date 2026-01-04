import { Empresa } from './../../model/empresa.model';
import { WHATSAPPMASSIVE_API } from './../whats-app-massive.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EmpresaService {

  constructor(private http: HttpClient) { }

    createOrUpdate(empresa:Empresa){
    
    console.log('entrou em createOrUpdate(empresa:Empresa)');
    if(empresa.id != null && empresa.id != 0){
      console.log(`Chamando put: ${WHATSAPPMASSIVE_API}/api/empresa`);
      return this.http.put(`${WHATSAPPMASSIVE_API}/api/empresa`, empresa);
    } else{
      empresa.id = 0;
      console.log(`Chamando post: ${WHATSAPPMASSIVE_API}/api/empresa`);
      return this.http.post(`${WHATSAPPMASSIVE_API}/api/empresa`, empresa);
    }
  }

  findAll(page: number, count: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/empresa/${page}/${count}`)
  }

  findById(id: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/empresa/${id}`)
  }

  delete(id: number){
    return this.http.delete(`${WHATSAPPMASSIVE_API}/api/empresa/${id}`)
  }
}
