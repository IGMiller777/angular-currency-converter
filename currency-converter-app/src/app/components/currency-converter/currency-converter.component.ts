import { Component, OnInit } from '@angular/core';
import {DataService} from "../../service/data.service";
import {catchError} from "rxjs";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.currencyList();
    this.currencyInHistoricalDate()
    this.currencyConvert();
  }


  public currencyList() {
    console.log('uu')
    this.dataService.getCurrencyList().subscribe((res) => {
      console.log('Currency list', res)
    })
  }

  public currencyConvert() {
    console.log('uu')
    this.dataService.getCurrencyConvert().subscribe((res) => {
      console.log('Currency convert', res)
    })
  }
  public currencyInHistoricalDate() {
    console.log('uu')
    this.dataService.getCurrencyHistoricalDate().subscribe((res) => {
      console.log('Currency historicalDate', res)
    })
  }

}
