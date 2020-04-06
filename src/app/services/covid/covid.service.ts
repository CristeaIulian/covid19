import { Injectable } from '@angular/core';

import {
  CountryDetails,
  CountryInfoFull,
  GraphStructure,
  States,
  Status,
  StatusDetails
} from '../../interfaces';

@Injectable({ providedIn: 'root' })
export class CovidService {
  constructor() {}

  extractData(data: CountryDetails[][]): Status[] {
    const result = [];
    data.forEach(resultSet => {
      resultSet.forEach(info => {
        const date = info.Date.split('T')[0];

        if (!result[date]) {
          result[date] = { confirmed: 0, recovered: 0, deaths: 0 };
        }

        if (info.Status === 'confirmed') {
          result[date].confirmed += info.Cases;
        }
        if (info.Status === 'recovered') {
          result[date].recovered += info.Cases;
        }
        if (info.Status === 'deaths') {
          result[date].deaths += info.Cases;
        }
      });
    });
    return result;
  }

  getCountryName(countrySlug: string, countries: CountryInfoFull): string {
    return countries.full.find(country => country.Slug === countrySlug).Country;
  }

  getCurrentState(peopleStatuses: StatusDetails[]): States {
    return peopleStatuses.find(status => status.checked).value;
  }

  getDataForGraph(
    countriesSelected: string[],
    countries: CountryInfoFull,
    data: Status[],
    peopleStatuses: StatusDetails[]
  ): GraphStructure {
    const oCategories = {};

    countriesSelected.forEach(countrySlug => {
      Object.keys(data[countrySlug]).forEach(date => {
        oCategories[date] = undefined;
      });
    });

    const categories = Object.keys(oCategories).sort();

    const series = [];
    countriesSelected.forEach(countrySlug => {
      const newSerie = {
        name: this.getCountryName(countrySlug, countries),
        data: Array(categories.length).fill(0)
      };

      Object.keys(data[countrySlug]).forEach(date => {
        const dateIndex = categories.indexOf(date);
        newSerie.data[dateIndex] =
          data[countrySlug][date][this.getCurrentState(peopleStatuses)];
      });
      series.push(newSerie);
    });

    return {
      categories,
      series
    };
  }
}
