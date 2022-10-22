import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, of} from "rxjs";
import {ICountriesList} from "../data/interfaces";

@Injectable({
  providedIn: 'root'
})
export class FlagsApiService {

  public currencyNames: any = [];
  protected readonly urlCurrencyNames: string = 'https://api.getgeoapi.com/v2/currency/list?api_key=491541064e413c945b459e8d015c07dc42d210c4&format=json';

  constructor(private http: HttpClient) { }

  public getCurrencyNames(): Observable<any> {
    return this.http.get<ICountriesList>(this.urlCurrencyNames).pipe(
      retry(3),
      catchError(error => {
        console.log(error);
        return of( null)
        }
      )
    )
  }

}
