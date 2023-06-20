import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Peso } from 'src/app/models/Peso';
import { SearchService } from 'src/app/services/search.service';
import { EditPasoDialog } from './edit-peso-dialog/edit-paso.dialog';
import { SetPesoSeleccionadoAction } from 'src/app/state/pesoSeleccionado.state';
import { Select, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { PesosService } from 'src/app/services/pesos.service';
import { ListaPesosState, ListaPesosStateModel, SetListaPesosAction } from 'src/app/state/listaPesos.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit{

  @Select(ListaPesosState.getListaPesos) $listaPesosState!: Observable<Peso[]>

  value = '';
  searchForm!: FormGroup;

  pesos: Peso[] = [];
  pesosFiltered: Peso[] = [];

  constructor(private searchService: SearchService,
              private fb: FormBuilder,
              public dialog: MatDialog,
              private store: Store,
              private router: Router,
              private pesosService: PesosService){}

  ngOnInit() {

    this.$listaPesosState.subscribe((pesos: Peso[])=>{
      this.pesos = pesos;
    })

    this.getPesos([]);

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
      console.log(value.criteria);
      this.searchService.setBuscando(value.criteria.length !== 0);
      if(value.criteria.length > 0){
        this.buscar(value.criteria);
      }else{
        this.pesosFiltered = this.pesos;
      }
    })
  }

  getPesos(listaActualizada: Peso[]){
    if(listaActualizada.length === 0){
      this.pesosService.getAllPesos().subscribe((pesos: Peso[])=>{
        this.store.dispatch(new SetListaPesosAction(pesos));
        //this.pesos = pesos;
        this.pesosFiltered = this.pesos;
      })
    }else{
      this.store.dispatch(new SetListaPesosAction(listaActualizada));
      //this.pesos = listaActualizada
      this.pesosFiltered = this.pesos;
    }
  }

  editarPeso(peso: Peso){
    const dialogRef = this.dialog.open(EditPasoDialog, {
      data: {nuevoPeso: peso.peso},
    });

    dialogRef.afterClosed().subscribe(nuevoPeso => {
      if(nuevoPeso && nuevoPeso !== ''){
        this.pesosService.addNewPeso(new Peso(peso.ejercicio, nuevoPeso, new Date()))
        .subscribe((listaActualizada: Peso[])=>{
          this.getPesos(listaActualizada);
        })
      }
    });
  }

  navigatePesoDetail(peso: Peso) {
    this.store.dispatch(new SetPesoSeleccionadoAction(peso)).subscribe(()=>{
      this.router.navigate(['detail'])
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
