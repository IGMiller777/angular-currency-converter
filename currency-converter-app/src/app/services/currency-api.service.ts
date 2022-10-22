import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, retry} from "rxjs";
import {ICurrencyConverted} from "../data/interfaces";

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {

  public date!: string;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  public getCurrencyConvert(currencyFirst: string, currencySecond: string, amount: number): Observable<any>{
    console.log(this.date)
    return this.http.get<ICurrencyConverted>(`https://api.getgeoapi.com/v2/currency/historical/${this.date}?api_key=491541064e413c945b459e8d015c07dc42d210c4&&from=${currencyFirst}&to=${currencySecond}&amount=${amount}&format=jsonformat=json`, this.httpOptions).pipe(
      retry(3),
      catchError(err => {
        console.log(err);
        return of(null)
      })
    )
  }
}
