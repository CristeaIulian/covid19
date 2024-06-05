import { Injectable } from '@angular/core';

import { CountryInfoFull, GraphStructure, States, Status, StatusDetails } from '../../interfaces';
import { SeriesOptionsType } from 'highcharts';

@Injectable({ providedIn: 'root' })
export class CovidService {
  getCountryName(countrySlug: string, countries: CountryInfoFull): string {
    return countries.full.find((country) => country.slug === countrySlug).countryName;
  }

  getCurrentState(peopleStatuses: StatusDetails[]): States {
    return peopleStatuses.find((status) => status.checked).value;
  }

  getDataForGraph(countriesSelected: string[], countries: CountryInfoFull, data: Record<string, Status>[], peopleStatus: States): GraphStructure {
    const oCategories = {};

    countriesSelected.forEach((countrySlug): void => {
      Object.keys(data[countrySlug]).forEach((date): void => {
        oCategories[date] = undefined;
      });
    });

    const categories = Object.keys(oCategories).sort();

    const series: SeriesOptionsType[] = [];
    countriesSelected.forEach((countrySlug): void => {
      const newSeries: SeriesOptionsType = {
        name: this.getCountryName(countrySlug, countries),
        data: Array(categories.length).fill(0),
        type: 'line',
      };

      Object.keys(data[countrySlug]).forEach((date): void => {
        const dateIndex = categories.indexOf(date);
        newSeries.data[dateIndex] = [date, data[countrySlug][date][peopleStatus]] as [string, number];
      });
      series.push(newSeries);
    });

    return {
      categories,
      series,
    };
  }
}
