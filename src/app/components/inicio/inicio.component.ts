import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  value = '';

  pesos = [
    {
      ejercicio: {
        descripcion: 'Cuadriceps'
      },
      peso: '35kg'
    },
    {
      ejercicio: {
        descripcion: 'Cuadriceps'
      },
      peso: '35kg'
    }
  ]

  alertar(){
    alert('hola jorge')
  }

}
