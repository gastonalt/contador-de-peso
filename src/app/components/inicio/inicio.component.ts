import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit{

  value = '';
  searchForm!: FormGroup;

  pesos = [
    {
      ejercicio: {
        descripcion: 'Cuadriceps'
      },
      peso: '35kg'
    },
    {
      ejercicio: {
        descripcion: 'Biceps'
      },
      peso: '5kg'
    }
  ];

  pesosFiltered: any[] = [];

  constructor(private searchService: SearchService, private fb: FormBuilder){}

  ngOnInit() {

    this.pesosFiltered = this.pesos;

    this.searchForm = this.fb.group({
      criteria: ['']
    });

    this.searchForm.valueChanges.subscribe((value: any)=>{
      this.searchService.setBuscando(value.criteria.length !== 0);
      if(value.criteria.length > 0){
        this.buscar(value.criteria);
      }else{
        this.pesosFiltered = this.pesos;
      }
    })
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
