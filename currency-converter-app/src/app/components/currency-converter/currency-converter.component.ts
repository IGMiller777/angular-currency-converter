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

  currencies = [
    { value: 'us', text: 'U.S. Dollar $' },
    { value: 'euro', text: 'Euro €' },
    { value: 'yen', text: 'Japanese Yen ¥' },
    { value: 'pound', text: 'Pounds £' },
    { value: 'inr', text: 'Indian Rupee ₹' }
  ];


  public currencyNames!:any;

  public dataModel: any = [];
  public dataCtrl: FormControl = new FormControl();
  public filterDataCtrl: FormControl = new FormControl();
  public filteredData: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('single-select', {static: true}) singleSelect!: MatSelect;

  _onDestroy = new Subject<void>();

  constructor(private currencyFlagsService: FlagsApiService,
              private currencyConvertService: CurrencyApiService,
              private http: HttpClient) {

  }


  ngOnInit(): void {
    this.getNamesOfCurrencies();
    this.testSubscribeFilteredData();
    this.filterDataCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData();
      })
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  filterData(){
    if(!this.dataModel) return;
    let search = this.filterDataCtrl.value;
    if(!search) {
      this.filteredData.next(this.dataModel.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredData.next(
      this.dataModel.filter(
        (item: any) => item.title.toLowerCase().indexOf(search) > -1
      )
    )

  }


  getNamesOfCurrencies() {
    return this.currencyFlagsService.getCurrencyNames().subscribe(res => {
      this.currencyNames = res.currencies;
      const keys = Object.keys(this.currencyNames)
      keys.forEach((key: any, index:number) => {
        this.dataModel.push({
          id: index,
          title: key,
          flag: key.slice(0,2).toLowerCase(),
          fullName: this.currencyNames[key],
          image: 'https://countryflagsapi.com/svg/' + key.slice(0,2).toLowerCase()
        });
        return this.dataModel;
      })
      this.filteredData.next(this.dataModel.slice());
    })
  }

  testSubscribeFilteredData() {
    this.filteredData.subscribe(data => {
      console.log('Subscribed filteredData', data[0]);
    });
  }
}
