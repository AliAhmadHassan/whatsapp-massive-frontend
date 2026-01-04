import { Campanha } from './../../model/campanha.model';
import { Usuario } from './../../model/usuario.model';
import { WHATSAPPMASSIVE_API } from './../whats-app-massive.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CampanhaService {

  constructor(private http: HttpClient) { }

    createOrUpdate(campanha:Campanha){
    
    console.log('entrou em createOrUpdate(campanha:Campanha)');
    if(campanha.id != null && campanha.id != 0){
      console.log(`Chamando put: ${WHATSAPPMASSIVE_API}/api/campanha`);
      return this.http.put(`${WHATSAPPMASSIVE_API}/api/campanha`, campanha);
    } else{
      campanha.id = 0;
      console.log(`Chamando post: ${WHATSAPPMASSIVE_API}/api/campanha`);
      return this.http.post(`${WHATSAPPMASSIVE_API}/api/campanha`, campanha);
    }
  }

  findAll(page: number, count: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/campanha/${page}/${count}`)
  }

  findByEmpresaId(page: number, count: number, empresaId: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/campanha/${page}/${count}/${empresaId}/empresaId`)
  }

  findById(id: number){
    return this.http.get(`${WHATSAPPMASSIVE_API}/api/campanha/${id}`)
  }

  delete(id: number){
    return this.http.delete(`${WHATSAPPMASSIVE_API}/api/campanha/${id}`)
  }

}