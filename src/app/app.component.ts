import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { animacion } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    animacion
  ]
})

export class AppComponent{

  constructor(private router: Router) {}

  public getRouterOutletState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

}
