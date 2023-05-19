import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Peso } from 'src/app/models/Peso';
import { SearchService } from 'src/app/services/search.service';
import { EditPasoDialog } from './edit-peso-dialog/edit-paso.dialog';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit{

  value = '';
  searchForm!: FormGroup;

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

  pesosFiltered: any[] = [];

  constructor(private searchService: SearchService, private fb: FormBuilder, public dialog: MatDialog){}

  ngOnInit() {

    this.pesosFiltered = this.pesos;

    this.searchForm = this.fb.group({
      criteria: ['']
    });

    this.searchService.getLimpiarBusqueda().subscribe((value: boolean)=>{
      if(value == true){
        this.searchForm.controls['criteria'].setValue('');
        this.searchService.setBuscando(false);
      }
    })

    this.searchForm.valueChanges.subscribe((value: any)=>{
      this.searchService.setBuscando(value.criteria.length !== 0);
      if(value.criteria.length > 0){
        this.buscar(value.criteria);
      }else{
        this.pesosFiltered = this.pesos;
      }
    })
  }

  editarPeso(peso: Peso){
    const dialogRef = this.dialog.open(EditPasoDialog, {
      data: {nuevoPeso: peso.peso},
    });

    dialogRef.afterClosed().subscribe(nuevoPeso => {
      console.log(nuevoPeso);
      // Edito en el backend este nuevo peso
    });
  }

  buscar(value: string){
    this.pesosFiltered = this.pesos.filter((peso: any)=>{
      return peso.ejercicio.descripcion.toLowerCase().includes(value.toLowerCase()); 
    })
  }

  alertar(){
    alert('Editar peso');
  }

  clearBusqueda(){
    this.searchForm.controls['criteria'].setValue('');
    this.searchService.setBuscando(false);
  }

}
