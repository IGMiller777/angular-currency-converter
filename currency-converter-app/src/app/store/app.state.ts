import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {FlagsApiService} from "../services/flags-api.service";
import {ConvertCurrency, GetCurrencyFlags} from "./app.action";
import {tap} from "rxjs";
import {CurrencyApiService} from "../services/currency-api.service";


export class AppStateModel {
  flags: any;
  currencyExchange: any
}

@State<AppStateModel>({
  name: 'CurrencyConvertApp',
  defaults: {
    flags: [],
    currencyExchange: []
  }
})

@Injectable()
export class AppState {

    constructor(private flagsService: FlagsApiService,
                private currencyConvert: CurrencyApiService) {
    }

    @Selector()
    static selectFlagsData(state: AppStateModel){
      return (state.flags, state.currencyExchange);
    }

    @Action(GetCurrencyFlags)
    getFlagsApi(ctx: StateContext<AppStateModel>) {
      return this.flagsService.getCurrencyNames().pipe(
        tap(returnFlags => {
          const state = ctx.getState();
          ctx.setState({
            ...state,
          flags: returnFlags
          })
       }))
    }

    @Action(ConvertCurrency)
    convertCurrency(ctx: StateContext<AppStateModel>, {flagOne, flagTwo, amount} : ConvertCurrency) {
      return this.currencyConvert.getCurrencyConvert(flagOne, flagTwo, amount).pipe(
        tap(returnCurrency => {
          const state = ctx.getState();
          ctx.setState({
            ...state,
            currencyExchange: returnCurrency
          })
        })
      )
    }
}
