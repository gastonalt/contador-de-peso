import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Peso } from 'src/app/models/Peso';
import { SearchService } from 'src/app/services/search.service';
import { PesosState } from 'src/app/state/pesoSeleccionado.state';

@Component({
  selector: 'app-subheader-status-section',
  templateUrl: './subheader-status-section.component.html',
  styleUrls: ['./subheader-status-section.component.scss']
})
export class SubheaderStatusSectionComponent implements OnInit {

  textSubHeader = 'Peso del día';
  textHeader = this.formatDate(new Date());
  isBuscando = false;

  @Select(PesosState.getPesoSeleccionado) pesoSeleccionado$!: Observable<Peso>;

  constructor(private searchService: SearchService, private router: Router, private store: Store){}

  ngOnInit() {
    this.searchService.getBuscando().subscribe((isBuscando: boolean)=>{
      this.isBuscando = !isBuscando;
      this.textSubHeader = isBuscando? 'Volver a inicio' : 'Peso del día';
      this.textHeader = isBuscando? 'Resultados' : this.formatDate(new Date());
    });

    this.router.events.subscribe((/* cambió la ruta */)=>{
      this.isBuscando = this.router.url.includes('inicio');
      if(this.router.url.includes('inicio')){
        this.textSubHeader = 'Peso del día';
        this.textHeader = this.formatDate(new Date());
      }else{
        this.textHeader = this.store.selectSnapshot(PesosState.getPesoSeleccionado)?.ejercicio?.descripcion + '';
        this.textSubHeader = 'Volver a inicio';
      }
    })
  }

  formatDate(inputDate: Date) {
    let date, month, year;

    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();

      date = date
          .toString()
          .padStart(2, '0');

      month = month
          .toString()
          .padStart(2, '0');

    return `${date}/${month}/${year}`;
  }

  clearBusqueda(){
    this.searchService.limpiarBusqueda();
    if(!this.router.url.includes('inicio')) this.router.navigate(['inicio'])
  }

}
