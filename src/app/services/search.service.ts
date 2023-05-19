import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private buscando: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private limpiarBusquedaFlag: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  getBuscando(): Observable<boolean>{
    return this.buscando;
  }

  setBuscando(isBuscando: boolean): void{
    this.buscando.next(isBuscando);
  }

  limpiarBusqueda(): void{
    this.limpiarBusquedaFlag.next(true);
    this.limpiarBusquedaFlag.next(false);
  }

  getLimpiarBusqueda(): Observable<boolean>{
    return this.limpiarBusquedaFlag;
  }


}
