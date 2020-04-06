export enum States {
  confirmed = 'confirmed',
  recovered = 'recovered',
  deaths = 'deaths'
}

export interface CountryDetails {
  Country: string;
  CountryCode: string;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: States;
  Date: string;
}

export interface CountryInfo {
  Country: string;
  Slug: string;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
  index: number;
  selected: boolean;
  color: string;
}

export interface CountryInfoFull {
  full: CountryInfo[];
  partial: CountryInfo[];
}

interface HighchartData {
  name: string;
  data: number[];
  _colorIndex?: number;
  _symbolIndex?: number;
}

export interface GraphStructure {
  categories: string[];
  series: HighchartData[];
}

export interface PageRange {
  start: number;
  end: number;
}

export interface PaginatorPreviousPage {
  previousPageIndex: number;
  pageIndex: number;
  pageSize: number;
  length: number;
}

export interface Status {
  confirmed: number;
  recovered: number;
  deaths: number;
}

export interface StatusDetails {
  value: States;
  checked: boolean;
}
