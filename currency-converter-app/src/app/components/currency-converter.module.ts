import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrensyDetailsComponent } from './currensy-details/currensy-details.component';
import {CurrensyConverterComponent} from "./currensy-converter/currensy-converter.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    CurrensyConverterComponent,
    CurrensyDetailsComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule
  ],
  exports: [CurrensyConverterComponent, CurrensyDetailsComponent]
})
export class CurrencyConverterModule { }
