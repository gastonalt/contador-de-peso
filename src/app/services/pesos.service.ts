import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Peso } from '../models/Peso';

@Injectable({
  providedIn: 'root'
})
export class PesosService {

  constructor(private httpClient: HttpClient) { }

  getAllPesos(): Observable<Peso[]>{
    return this.httpClient.get<Peso[]>('api/pesos/findAll')
  }

  getPesosByEjercicio(idEjercicio: number): Observable<Peso[]>{
    return this.httpClient.get<Peso[]>('api/pesos/findAllByEjercicio/' + idEjercicio);
  }
}
