export class GetCurrencyFlags {
  static readonly type = '[Flags] Get';
}

export class ConvertCurrency {
  static readonly type = '[Currency] Get';
  constructor(public flagOne: string, public flagTwo: string, public amount: number) {
  }
}
