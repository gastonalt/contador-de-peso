import { Injectable } from '@angular/core';
import { Peso } from '../models/Peso';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {

  constructor(private httpClient: HttpClient) { }

  addEjercicio(descripcionEjercicio: string, peso: number, fecha: Date): Observable<Peso[]>{
    return this.httpClient.post<Peso[]>('api/ejercicios/add', {descripcionEjercicio, peso, fecha});
  }
}
