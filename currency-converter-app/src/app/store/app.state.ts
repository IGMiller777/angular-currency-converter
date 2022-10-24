import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {FlagsApiService} from "../services/flags-api.service";
import {GetCurrencyFlags} from "./app.action";
import {tap} from "rxjs";


export class AppStateModel {
  flags: any;
}

@State<AppStateModel>({
  name: 'FlagsApi',
  defaults: {
    flags: []
  }
})

@Injectable()
export class AppState {

    constructor(private flagsService: FlagsApiService) {
    }

    @Selector()
    static selectFlagsData(state: AppStateModel){
      return state.flags;
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
}
