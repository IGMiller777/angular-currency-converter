export interface ICountriesList {
  [key: string] : string
}

export interface IUpdatedList {
  id: number,
  title: string
  fullName: string
  searchName: string,
  flag: string
  flagConvert: string,
  image: string
}

export interface ICurrencyConverted {
  amount: string,
  base_currency_code: string,
  base_currency_name: string,
  rates: ICurrentCurrencyInfo,
  status: string,
  updated_date: string
}

export interface ICurrentCurrencyInfo {
  [key: string] : IResultOfConversion
}

export interface IResultOfConversion {
  currency_name: string,
  rate: string,
  rate_for_amount: string
}




