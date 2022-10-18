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

  //Control 1

  public listOfCountries: any = []; // List of Flags
  public countryControl: FormControl = new FormControl(); //Control for selected
  public filterForCountryControl: FormControl = new FormControl(); //Control for selected
  public filteredCountries: ReplaySubject<any[]> = new ReplaySubject<any[]>(1)
  @ViewChild('singleSelect', {static: true}) singleSelect!: MatSelect;
  protected _onDestroy = new Subject<void>();


  public formCurrency!: FormGroup;
  constructor(private currencyFlagsService: FlagsApiService,
              private currencyConvertService: CurrencyApiService,
              private http: HttpClient,
              private _fb: FormBuilder) {

    this.formCurrency = this._fb.group({
      selectOption1: new FormControl('', [
        Validators.required,
      ]),
      amountCurrency: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ])
    })

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
    this.countryControl.setValue(this.listOfCountries);
    this.filteredCountries.next(this.listOfCountries.slice());
    this.filterForCountryControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCountries();
      })
  }

  convertValue() {
    // this.formCurrency.controls['selectOption1'].setValue()
    console.log(this.formCurrency)
    // console.log(this.selectedCurrency2)
  }

  protected filterCountries() {
    if (!this.listOfCountries) {
      return;
    }
    let search = this.filterForCountryControl.value;
    if (!search) {
      this.filteredCountries.next(this.listOfCountries.slice());
      return;
    } else {
      search = search.toLowerCase();
      console.log(search, 'KK')
    }
    const newFilterCountre = this.listOfCountries.filter(
      (item: any) => {
        const result = item.title.toLowerCase().indexOf(search) > -1;
        return result
      })
    this.filteredCountries.next(newFilterCountre)
  }

  protected setInitialValue () {
    this.filteredCountries.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
      this.singleSelect.compareWith= (a: any, b :any) => a && b && a.id === b.id
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
          flag: key.slice(0,2).toLowerCase(),
          flagConvert: key.slice(0,3).toUpperCase(),
          fullName: this.currencyNames[key],
          image: 'https://countryflagsapi.com/svg/' + key.slice(0,2).toLowerCase()
        });
        this.setInitialValues();
        return this.listOfCountries
      })
    })
  }

}
