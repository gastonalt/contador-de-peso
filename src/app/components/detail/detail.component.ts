import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Select, Store} from '@ngxs/store';
import { Observable } from 'rxjs';
import { Peso } from 'src/app/models/Peso';
import { PesosService } from 'src/app/services/pesos.service';
import { PesosState } from 'src/app/state/pesoSeleccionado.state';
import { EditPasoByFechaDialog } from './edit-peso-by-fecha-dialog/edit-peso-by-fecha.dialog';
import { ConfirmEliminarDialog } from './confirm-eliminar-dialog/confirm-eliminar.dialog';
import { ListaPesosState, SetListaPesosAction } from 'src/app/state/listaPesos.state';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{
  @Select(PesosState.getPesoSeleccionado) pesoSeleccionado$!: Observable<Peso>;
  @Select(ListaPesosState.getListaPesos) pesos$!: Observable<Peso[]>;
  pesoSeleccionado!: Peso;
  pesos: Peso[] = [];

  constructor(private pesosService: PesosService,
              public dialog: MatDialog,
              private store: Store
              ){}

  ngOnInit(): void {
    this.pesos$.subscribe(pesos => {
      this.pesos = pesos;
    })
    this.getPesos([]);
  }

  getPesos(listaActualizada: Peso[]){
    if(listaActualizada.length > 0){
      this.store.dispatch(new SetListaPesosAction(listaActualizada));
      //this.pesos = listaActualizada;
    }else{
      this.pesoSeleccionado$.subscribe((peso: any) => {
        this.pesoSeleccionado = peso;
        this.pesosService.getPesosByEjercicio(peso.ejercicio.idEjercicio).subscribe((pesos: Peso[])=>{
          this.store.dispatch(new SetListaPesosAction(pesos));
          //this.pesos = pesos;
        })
      })
    }
  }

  editarPeso(peso: Peso){
    const dialogRef = this.dialog.open(EditPasoByFechaDialog, {
      data: {pesoAnterior: peso.peso, nuevoPeso: peso.peso, fechaPesoAnterior: peso.fecha},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result !== ''){
        console.log(result)
        this.pesosService.updatePeso(peso.idPeso, result, this.pesoSeleccionado.ejercicio.idEjercicio)
        .subscribe((listaActualizada: Peso[])=>{
          this.getPesos(listaActualizada);
        })
      }
    });
  }

  eliminar(peso: Peso){
    const dialogRef = this.dialog.open(ConfirmEliminarDialog);

    dialogRef.afterClosed().subscribe(eliminar => {
      if(eliminar){
        this.pesosService.deletePeso(peso.idPeso, peso.ejercicio.idEjercicio)
        .subscribe((listaActualizada: Peso[])=>{
          this.getPesos(listaActualizada);
        })
      }
    });
  }
}
