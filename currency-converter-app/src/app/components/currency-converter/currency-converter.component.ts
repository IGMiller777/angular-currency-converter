import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FlagsApiService} from "../../services/flags-api.service";
import {CurrencyApiService} from "../../services/currency-api.service";
import {HttpClient} from "@angular/common/http";
import { MatSelect } from '@angular/material/select';
import {ReplaySubject, Subject, take} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'angular-mat-select-app';
  selected: string | undefined;
   public currencyNames!:any;

   public listOfCountries: any = [];
  protected _onDestroy = new Subject<void>();

  //Control 1
  public countryControl1: FormControl = new FormControl();
  public filterForCountryControl1: FormControl = new FormControl();
  public filteredCountries1: ReplaySubject<any[]> = new ReplaySubject<any[]>(1)
  @ViewChild('singleSelectFirst') singleSelectFirst!: MatSelect;
  public amountCurrency1: FormControl =  new FormControl("");

  //Control 2
  public countryControl2: FormControl = new FormControl();
  public filterForCountryControl2: FormControl = new FormControl();
  public filteredCountries2: ReplaySubject<any[]> = new ReplaySubject<any[]>(1)
  @ViewChild('singleSelectSecond', {static: true}) singleSelectSecond!: MatSelect;
  public amountCurrency2: FormControl =  new FormControl("");

  checkValue: FormControl = new FormControl('');




  constructor(private currencyFlagsService: FlagsApiService,
              private currencyConvertService: CurrencyApiService,
              private http: HttpClient) {

  }


  ngOnInit(): void {
    this.getNamesOfCurrencies();
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  setInitialValues() {
    this.countryControl1.setValue(this.listOfCountries);
    this.countryControl2.setValue(this.listOfCountries);

    this.filteredCountries1.next(this.listOfCountries.slice());
    this.filteredCountries2.next(this.listOfCountries.slice());

    this.filterForCountryControl1.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCountries1();
      })

    this.filterForCountryControl2.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCountries2();
      })
  }

  check() {
    const currencyFirst = this.singleSelectFirst.ngControl.control?.value.title;
    const currencySecond = this.singleSelectSecond.ngControl.control?.value.title;
    const amount1 = this.amountCurrency1.value;
    const amount2 = this.amountCurrency2.value;
    console.log(currencyFirst, amount1, 'One')
    console.log(currencySecond, amount2, 'TWO')

  }

  convertValue(value: any) {

    // console.log(this.amountCurrency1)
    // this.formCurrency.controls['selectOption1'].setValue()
    // console.log(this.selectedCurrency2)
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

  protected setInitialValue () {
    this.filteredCountries1.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
      this.singleSelectFirst.compareWith= (a: any, b :any) => a && b && a.id === b.id
    })
  }

  getNamesOfCurrencies() {
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

}
