import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private buscando: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  getBuscando(): Observable<boolean>{
    return this.buscando;
  }

  setBuscando(isBuscando: boolean): void{
    this.buscando.next(isBuscando);
  }
}
