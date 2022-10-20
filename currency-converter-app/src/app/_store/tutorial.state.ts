import {Action, Select, Selector, State, StateContext} from "@ngxs/store";
import * as TutorialAction from '../_store/tutorial.action';

export class TutorialStateModel {
  tutorial!: any[]
}


@State<TutorialStateModel>({
  name: 'tutorial',
  defaults: {
    tutorial: []
  }
})
export class TutorialState {
  @Selector()
  static getTutorial(state: TutorialStateModel): any[] {
    return state.tutorial
  }

  @Action(TutorialAction.AddTutorial)
  get({getState, patchState}: StateContext<TutorialStateModel>,
      {payload} : TutorialAction.AddTutorial): any {
    const state = getState();
    patchState({tutorial: [...state.tutorial, payload]})
  }

  @Action(TutorialAction.RemoveTutorial)
  remove({getState, patchState} : StateContext<TutorialStateModel>,
         {payload}: TutorialAction.RemoveTutorial): any {
    patchState({tutorial: getState().tutorial.filter(tutorial => tutorial.name !== payload)})
  }

}
