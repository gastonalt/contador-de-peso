import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-subheader-status-section',
  templateUrl: './subheader-status-section.component.html',
  styleUrls: ['./subheader-status-section.component.scss']
})
export class SubheaderStatusSectionComponent implements OnInit {

  textSubHeader = 'Peso del día';
  textHeader = this.formatDate(new Date());

  constructor(private searchService: SearchService){}

  ngOnInit() {
    this.searchService.getBuscando().subscribe((isBuscando: boolean)=>{
      this.textSubHeader = isBuscando? 'Volver a inicio' : 'Peso del día';
      this.textHeader = isBuscando? 'Resultados' : this.formatDate(new Date());
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

}
