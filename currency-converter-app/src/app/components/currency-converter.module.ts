import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrensyDetailsComponent } from './currensy-details/currensy-details.component';
import {CurrensyConverterComponent} from "./currensy-converter/currensy-converter.component";



@NgModule({
  declarations: [
    CurrensyConverterComponent,
    CurrensyDetailsComponent],
  imports: [
    CommonModule
  ],
  exports: [CurrensyConverterComponent, CurrensyDetailsComponent]
})
export class CurrencyConverterModule { }
