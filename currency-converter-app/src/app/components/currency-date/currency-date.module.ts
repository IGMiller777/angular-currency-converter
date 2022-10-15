import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CurrencyDateComponent} from "./currency-date.component";

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
const materialModules = [
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  declarations: [
    CurrencyDateComponent
  ],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    CurrencyDateComponent
  ]
})
export class CurrencyDateModule { }
