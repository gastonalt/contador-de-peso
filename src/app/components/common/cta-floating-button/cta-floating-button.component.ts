import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditPasoDialog } from '../../inicio/edit-peso-dialog/edit-paso.dialog';
import { PesosService } from 'src/app/services/pesos.service';
import { Peso } from 'src/app/models/Peso';
import { PesosState } from 'src/app/state/pesoSeleccionado.state';
import { Store } from '@ngxs/store';
import { SetListaPesosAction } from 'src/app/state/listaPesos.state';

@Component({
  selector: 'app-cta-floating-button',
  templateUrl: './cta-floating-button.component.html',
  styleUrls: ['./cta-floating-button.component.scss']
})
export class CtaFloatingButtonComponent implements OnInit {

  ruta = '';

  constructor(private router: Router, private dialog: MatDialog, private pesosService: PesosService, private store: Store){}

  ngOnInit(): void {
    this.router.events.subscribe((/* cambió la ruta */)=>{
      this.ruta = this.router.url;
    });
  }

  agregarNuevoEjercicio(){

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
