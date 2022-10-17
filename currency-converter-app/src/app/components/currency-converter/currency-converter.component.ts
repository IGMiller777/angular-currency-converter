import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FlagsApiService} from "../../services/flags-api.service";
import {CurrencyApiService} from "../../services/currency-api.service";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  title = 'angular-mat-select-app';
  selected: string | undefined;
   public currencyNames!:any;


  //Control 1
  public selectedCurrency1!: string;
  public dataCurrency1: any = [];
  public currencyBox1: FormControl = new FormControl();
  public filterCurrency1: FormControl = new FormControl();
  public filteredData1: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('single-select', {static: true}) singleSelect1!: MatSelect;

  _onDestroy = new Subject<void>();

  constructor(private currencyFlagsService: FlagsApiService,
              private currencyConvertService: CurrencyApiService,
              private http: HttpClient) {

  }


  ngOnInit(): void {
    this.getNamesOfCurrencies();
    this.testSubscribeFilteredData();
    this.filterCurrency1.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData();
      })
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  convertValue() {
    console.log(this.selectedCurrency1)
  }

  filterData(){
    if(!this.dataCurrency1) return;
    let search = this.filterCurrency1.value;
    if(!search) {
      this.filteredData1.next(this.dataCurrency1.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    const filteredCur = this.dataCurrency1.filter(
      (item: any) => {
        const result = item.title.toLowerCase().indexOf(search) > -1;
        return result
      }
    )
    console.log(filteredCur)
    this.filteredData1.next(filteredCur)
  }

  getNamesOfCurrencies() {
    return this.currencyFlagsService.getCurrencyNames().subscribe(res => {
      this.currencyNames = res.currencies;
      const keys = Object.keys(this.currencyNames)
      keys.forEach((key: any, index:number) => {
        this.dataCurrency1.push({
          id: index,
          title: key,
          flag: key.slice(0,2).toLowerCase(),
          flagConvert: key.slice(0,3).toUpperCase(),
          fullName: this.currencyNames[key],
          image: 'https://countryflagsapi.com/svg/' + key.slice(0,2).toLowerCase()
        });
        return this.dataCurrency1;
      })
      this.filteredData1.next(this.dataCurrency1.slice());
    })
  }

  testSubscribeFilteredData() {
    this.filteredData1.subscribe(data => {
      // console.log('Subscribed filteredData1', data[0]);
    });
  }
}
