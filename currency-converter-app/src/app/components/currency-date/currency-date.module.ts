import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CurrencyDateComponent} from "./currency-date.component";
import {MatSliderModule} from "@angular/material/slider";


@NgModule({
  declarations: [
    CurrencyDateComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule
  ],
  exports: [
    CurrencyDateComponent
  ]
})
export class CurrencyDateModule { }
