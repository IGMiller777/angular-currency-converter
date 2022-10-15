import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency-date',
  templateUrl: './currency-date.component.html',
  styleUrls: ['./currency-date.component.scss']
})
export class CurrencyDateComponent implements OnInit {

  public startDate = new Date();
  public currentDate:string = this.startDate.toLocaleDateString('en-US');
  constructor() { }

  ngOnInit(): void {
    console.log(this.currentDate)
  }

}
