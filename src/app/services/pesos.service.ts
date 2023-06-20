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

  addNewPeso(newPeso: Peso): Observable<Peso[]>{
    return this.httpClient.post<Peso[]>('api/pesos/add', newPeso);
  }

  updatePeso(idPeso: number, newPeso: number, idEjercicio: number): Observable<Peso[]>{
    return this.httpClient.put<Peso[]>(`api/pesos/update/${idPeso}`, {newPeso, idEjercicio});
  }

  deletePeso(idPeso: number, idEjercicio: number): Observable<Peso[]>{
    return this.httpClient.delete<Peso[]>(`api/pesos/delete/${idPeso}/${idEjercicio}`);
  }

  addByEjercicio(newPeso: Peso): Observable<Peso[]>{
    return this.httpClient.post<Peso[]>('api/pesos/addByEjercicio', newPeso);
  }
}
