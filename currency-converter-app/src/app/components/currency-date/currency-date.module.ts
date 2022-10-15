import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CurrencyDateComponent} from "./currency-date.component";



@NgModule({
  declarations: [
    CurrencyDateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CurrencyDateComponent
  ]
})
export class CurrencyDateModule { }
