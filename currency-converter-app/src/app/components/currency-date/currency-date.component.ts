import { Component, OnInit } from '@angular/core';
import { formatDate} from "@angular/common";
import {CurrencyApiService} from "../../services/currency-api.service";

@Component({
  selector: 'app-currency-date',
  templateUrl: './currency-date.component.html',
  styleUrls: ['./currency-date.component.scss']
})
export class CurrencyDateComponent implements OnInit {
  public startDate = new Date();
  public newDate!: string;
  protected format: string = 'yyyy-MM-dd';
  protected local: string = 'en-US';
  public currentDate:string = this.startDate.toLocaleDateString('en-US');
  constructor(private convertService: CurrencyApiService) { }

  ngOnInit(): void {
    this.currentDate = formatDate(this.startDate, this.format, this.local);
    this.convertService.date = this.currentDate;
  }

  public changeDate(event: any) {
   this.newDate = event.value;
   let formattedDate = formatDate(this.newDate, this.format, this.local)
    if(formattedDate > this.currentDate) {
      formattedDate = this.currentDate;
      alert('Please, choose date early')
    }
    this.convertService.date = formattedDate;
    this.currentDate = formattedDate
  }
}
