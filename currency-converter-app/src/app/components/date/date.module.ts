import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DateComponent} from "./date.component";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    DateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateComponent
  ]
})
export class DateModule { }
