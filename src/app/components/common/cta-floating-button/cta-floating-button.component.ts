import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditPasoDialog } from '../../inicio/edit-peso-dialog/edit-paso.dialog';
import { PesosService } from 'src/app/services/pesos.service';
import { Peso } from 'src/app/models/Peso';
import { PesosState } from 'src/app/state/pesoSeleccionado.state';
import { Store } from '@ngxs/store';
import { SetListaPesosAction } from 'src/app/state/listaPesos.state';
import { NewEjercicioDialog } from './new-ejercicio-dialog/new-ejercicio.dialog';
import { EjerciciosService } from 'src/app/services/ejercicios.service';

@Component({
  selector: 'app-cta-floating-button',
  templateUrl: './cta-floating-button.component.html',
  styleUrls: ['./cta-floating-button.component.scss']
})
export class CtaFloatingButtonComponent implements OnInit {

  ruta = '';

  offsetFlag: boolean = false;

  constructor(private router: Router, private dialog: MatDialog, private pesosService: PesosService, private store: Store, private ejerciciosService: EjerciciosService){}

  ngOnInit(): void {
    this.router.events.subscribe((/* cambió la ruta */)=>{
      this.ruta = this.router.url;
    });
  }

  @HostListener('window:scroll', ['$event']) getScrollHeight(event: any) {
    if(window.pageYOffset> 0 )
      this.offsetFlag = false;
    else
      this.offsetFlag = true;
  }

  agregarNuevoEjercicio(){
    const dialogRef = this.dialog.open(NewEjercicioDialog, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data && data.descripcionEjercicio && data.descripcionEjercicio !== '' && data.peso && data.peso !== ''){
        this.ejerciciosService.addEjercicio(data.descripcionEjercicio, data.peso)
        .subscribe((listaActualizada: Peso[])=>{
          console.log(listaActualizada);
          this.store.dispatch(new SetListaPesosAction(listaActualizada));
        })
      }
    });
  }

  agregarNuevoPeso(){
    const peso = this.store.selectSnapshot(PesosState.getPesoSeleccionado);
    const dialogRef = this.dialog.open(EditPasoDialog, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(nuevoPeso => {
      if(nuevoPeso && nuevoPeso !== ''){
        this.pesosService.addByEjercicio(new Peso(peso!.ejercicio, nuevoPeso, new Date()))
        .subscribe((listaActualizada: Peso[])=>{
          this.store.dispatch(new SetListaPesosAction(listaActualizada));
        })
      }
    });
  }

}
