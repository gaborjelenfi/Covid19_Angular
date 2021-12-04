export interface CovidData {
  Countries: Array<CountriesData>;
  Date: string;
  Global: object;
  ID: string;
  Message: string;
}

export interface CountriesData {
  Country: string;
  CountryCode: string;
  DateString: string;
  ID: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  Premium: object;
  Slug: string;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}
