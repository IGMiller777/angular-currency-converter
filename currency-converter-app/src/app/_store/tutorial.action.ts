
export class AddTutorial {
  static readonly type = '[Tutorial] Add'
  constructor(public payload: any) {
  }
}

export class RemoveTutorial {
  static readonly type = '[Tutorial] Remove'
  constructor(public payload: string) {
  }
}
