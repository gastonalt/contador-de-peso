import { Component, OnInit } from '@angular/core';
import {Select} from '@ngxs/store';
import { Observable } from 'rxjs';
import { Peso } from 'src/app/models/Peso';
import { PesosService } from 'src/app/services/pesos.service';
import { PesosState } from 'src/app/state/pesoSeleccionado.state';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{
  @Select(PesosState) pesoSeleccionado$!: Observable<Peso>;
  pesoSeleccionado!: Peso;
  pesosFiltered: Peso[] = [];

  pesos: Peso[] = [
    {
      idPeso: 1,
      ejercicio: {
        idEjercicio: 1,
        descripcion: 'Cuadriceps'
      },
      peso: 35,
      borrado: false,
      fecha: new Date()
    },
    {
      idPeso: 2,
      ejercicio: {
        idEjercicio: 2,
        descripcion: 'Biceps'
      },
      peso: 5,
      borrado: false,
      fecha: new Date()
    }
  ];

  constructor(private pesosService: PesosService){}

  ngOnInit(): void {

    
    this.pesosFiltered = this.pesos;
    
    this.pesoSeleccionado$.subscribe((peso: any) => {
      this.pesoSeleccionado = peso;
      console.log(this.pesoSeleccionado)
      this.pesosService.getPesosByEjercicio(peso.pesoSeleccionado.ejercicio.idEjercicio).subscribe((pesos: Peso[])=>{
        this.pesosFiltered = pesos;
      })
    })
  }

  eliminar(peso: Peso){

  }
}
