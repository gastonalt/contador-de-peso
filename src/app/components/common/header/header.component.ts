import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  icono: string = 'sentiment_satisfied_alt'

  toggleIcon(){
    this.icono = this.icono == 'sentiment_satisfied_alt' ? 'tag_faces' : 'sentiment_satisfied_alt';
  }

}
