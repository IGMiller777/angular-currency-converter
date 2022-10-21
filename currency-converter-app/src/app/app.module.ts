import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {CurrencyConverterModule} from "./components/currency-converter/currency-converter.module";
import {CurrencyDateModule} from "./components/currency-date/currency-date.module";
import {NgxsModule} from "@ngxs/store";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
// import {TutorialState} from "./_store/tutorial.state";
import { NgxsComponent } from './ngxs/ngxs.component';
@NgModule({
  declarations: [
    AppComponent,
    NgxsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    // NgxsModule.forRoot([TutorialState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule,
    CurrencyConverterModule,
    CurrencyDateModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
