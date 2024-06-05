import { SeriesOptionsType } from 'highcharts';

export enum States {
  confirmed = 'confirmed',
  recovered = 'recovered',
  deaths = 'deaths',
}

export interface CountryInfo {
  countryName: string;
  countryCode: string;
  slug: string;
  totalConfirmed: number;
  totalDeaths: number;
  totalRecovered: number;
  index: number;
  selected: boolean;
  color: string;
}

export interface CountryInfoFull {
  full: CountryInfo[];
  partial: CountryInfo[];
}

export interface GraphStructure {
  categories: string[];
  series: SeriesOptionsType[];
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
