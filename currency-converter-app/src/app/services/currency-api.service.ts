import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {

//https://api.getgeoapi.com/v2/currency/historical/2018-12-27?api_key=491541064e413c945b459e8d015c07dc42d210c4&from=BYN&to=USD&amount=4000&format=json
  // https://api.getgeoapi.com/v2/currency/list?api_key=491541064e413c945b459e8d015c07dc42d210c4&format=json

  public baseUrl: string = 'https://api.getgeoapi.com/v2/currency/';
  protected userKey: string = 'bf523fb044a11114964daa3d15169f601afc4eca';
  public date!: string;
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }


  // public getCurrency(): Observable<any> {
  //   console.log('rrr')
  //     return this.http.get(`https://api.getgeoapi.com/v2/currency/list?api_key=491541064e413c945b459e8d015c07dc42d210c4&format=json`).pipe(
  //       retry(3),
  //       catchError(err => {
  //         console.log(err);
  //         return of(null)
  //       })
  //     )
  // }

  public getCurrencyList(): Observable<any>{
    return this.http.get(`https://api.getgeoapi.com/v2/currency/list?api_key=491541064e413c945b459e8d015c07dc42d210c4&format=json`).pipe(
      retry(3),
      catchError(err => {
        console.log(err);
        return of(null)
      })
    )
  }

  public getCurrencyConvert(currencyFirst: string, currencySecond: string, amount: number): Observable<any>{
    console.log(this.date)
    return this.http.get(`https://api.getgeoapi.com/v2/currency/historical/${this.date}?api_key=491541064e413c945b459e8d015c07dc42d210c4&&from=${currencyFirst}&to=${currencySecond}&amount=${amount}&format=jsonformat=json`).pipe(
      retry(3),
      catchError(err => {
        console.log(err);
        return of(null)
      })
    )
  }
  public getCurrencyHistoricalDate(): Observable<any>{
    return this.http.get(`https://api.getgeoapi.com/v2/currency/historical/2018-10-12?api_key=491541064e413c945b459e8d015c07dc42d210c4&format=json`).pipe(
      retry(3),
      catchError(err => {
        console.log(err);
        return of(null)
      })
    )
  }
}
