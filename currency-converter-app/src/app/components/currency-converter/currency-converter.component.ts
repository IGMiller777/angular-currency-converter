import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FlagsApiService} from "../../services/flags-api.service";
import {CurrencyApiService} from "../../services/currency-api.service";
import {HttpClient} from "@angular/common/http";
import {ICountriesList, IUpdatedList} from "../../data/interfaces";
import { MatSelect } from '@angular/material/select';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  ReplaySubject,
  Subject,
  take
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {

  public isReverse: boolean = false;
  public currencyNames!: ICountriesList;
  public listOfCountries: IUpdatedList[] = [];
  protected _onDestroy = new Subject<void>();
  //Control 1
  public countryControl1: FormControl = new FormControl();
  public filterForCountryControl1: FormControl = new FormControl();
  public filteredCountries1: ReplaySubject<IUpdatedList[]> = new ReplaySubject<IUpdatedList[]>(1)
  @ViewChild('selectFlagOne') selectFlagOne!: MatSelect;
  @ViewChild('currencyInputOne', {static: true}) currencyInputOne!: ElementRef;
  public amountCurrency1: FormControl =  new FormControl("");

  //Control 2
  public countryControl2: FormControl = new FormControl();
  public filterForCountryControl2: FormControl = new FormControl();
  public filteredCountries2: ReplaySubject<any[]> = new ReplaySubject<any[]>(1)
  @ViewChild('selectFlagTwo', {static: true}) selectFlagTwo!: MatSelect;
  @ViewChild('currencyInputTwo', {static: true}) currencyInputTwo!: ElementRef;
  public amountCurrency2: FormControl =  new FormControl("");


  constructor(private currencyFlagsService: FlagsApiService,
              private currencyConvertService: CurrencyApiService) {}

  ngOnInit(): void {
    this.getNamesOfCurrencies();
    this.convertCurrencyFieldOne();
    this.convertCurrencyFieldTwo();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  public getNamesOfCurrencies() {
    return this.currencyFlagsService.getCurrencyNames().subscribe(res => {
      this.currencyNames = res.currencies;
      const keys = Object.keys(this.currencyNames)
      keys.forEach((key: any, index:number) => {
        this.listOfCountries.push({
          id: index,
          title: key,
          fullName: this.currencyNames[key],
          searchName: `${key} ${this.currencyNames[key]}`,
          flag: key.slice(0,2).toLowerCase(),
          flagConvert: key.slice(0,3).toUpperCase(),
          image: 'https://countryflagsapi.com/svg/' + key.slice(0,2).toLowerCase()
        });
        return this.listOfCountries
      })
      this.setInitialValues();
    })
  }

  public setInitialValues() {
    this.countryControl1.setValue(this.listOfCountries);
    console.log('@@==', this.countryControl1)
    this.countryControl2.setValue(this.listOfCountries);

    this.filteredCountries1.next(this.listOfCountries.slice());
    this.filteredCountries2.next(this.listOfCountries.slice());

    this.filterForCountryControl1.valueChanges
      .pipe(
        takeUntil(this._onDestroy),
        debounceTime(200)
      )
      .subscribe(() => {
        this.filterCountries1();
      })

    this.filterForCountryControl2.valueChanges
      .pipe(
        takeUntil(this._onDestroy),
        debounceTime(200)
      )
      .subscribe(() => {
        this.filterCountries2();
      })
  }

  protected filterCountries1() {
    if (!this.listOfCountries) {
      return;
    }
    let search = this.filterForCountryControl1.value;
    if (!search) {
      this.filteredCountries1.next(this.listOfCountries.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    const newFilterCountre = this.listOfCountries.filter(
      (item: any) => {
        const result = item.searchName.toLowerCase().indexOf(search) > -1;
        return result
      })
    this.filteredCountries1.next(newFilterCountre)
  }
  protected filterCountries2() {
    if (!this.listOfCountries) {
      return;
    }
    let search = this.filterForCountryControl2.value;
    if (!search) {
      this.filteredCountries2.next(this.listOfCountries.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    const newFilterCountre = this.listOfCountries.filter(
      (item: any) => {
        const result = item.searchName.toLowerCase().indexOf(search) > -1;
        return result
      })
    this.filteredCountries2.next(newFilterCountre)
  }














  public convertCurrencyFieldOne() {
    fromEvent(this.currencyInputOne.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value
      }),
      debounceTime(1000),
      distinctUntilChanged()).subscribe((amount: any) => {
      const flagOne = this.selectFlagOne.ngControl.control?.value.title;
      const flagTwo = this.selectFlagTwo.ngControl.control?.value.title;
      if(flagTwo !== undefined && flagOne !== undefined && amount !== 0 || undefined) {
        console.log('True');
        this.currencyConvertService.getCurrencyConvert(flagOne, flagTwo,amount).subscribe((res) => {
            if(res) this.insertData(JSON.stringify(res.rates), flagTwo, 1)
          }
        )
      }
      else {
        alert('Please Choose Currency Flag!!!')
      }
    })
}
  public convertCurrencyFieldTwo() {
    fromEvent(this.currencyInputTwo.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value
      }),
      debounceTime(1000),
      distinctUntilChanged()).subscribe((amount: any) => {
      const flagOne = this.selectFlagOne.ngControl.control?.value.title;
      const flagTwo = this.selectFlagTwo.ngControl.control?.value.title;
      if(flagTwo !== undefined && flagOne !== undefined && amount !== 0 || undefined) {
        console.log('True');
        this.currencyConvertService.getCurrencyConvert(flagTwo, flagOne, amount).subscribe((res) => {
            if(res) this.insertData(JSON.stringify(res.rates), flagOne, 2)
          }
        )
      }
      else {
        alert('Please Choose Currency Flag!!!')
      }
    })
}
  public insertData(data: any, key: any, id: number) {
    let result = data.split(',')[2].split('"')[3]
    if(id == 1) {
      this.amountCurrency2.setValue(result)
    }
    if(id == 2) {
      this.amountCurrency1.setValue(result)

    }
  }




  public check() {
    const currencyFirst = this.selectFlagOne.ngControl.control?.value.title;

    const currencySecond = this.selectFlagTwo.ngControl.control?.value.title;
    console.log(currencySecond)

    // const amount1 = this.amountCurrency1.value;
    // const amount2 = this.amountCurrency2.value;


    // console.log(currencyFirst, amount1, 'One')
    // console.log(currencySecond, amount2, 'TWO')

  }
  public convertValue(value: any) {
  }
}
