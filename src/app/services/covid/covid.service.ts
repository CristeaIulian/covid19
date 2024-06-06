import { Injectable } from '@angular/core';

import {
  CountryInfoFull,
  GraphStructure,
  States,
  Status,
  StatusDetails,
} from '../../interfaces';
import { SeriesOptionsType } from 'highcharts';

@Injectable({ providedIn: 'root' })
export class CovidService {
  getCountryName(countrySlug: string, countries: CountryInfoFull): string {
    const country = countries.full.find(
      (country) => country.slug === countrySlug,
    );
    return country?.countryName || '';
  }

  getCurrentState(peopleStatuses: StatusDetails[]): States | undefined {
    const statuses = peopleStatuses.find((status) => status.isChecked);
    return statuses?.value || undefined;
  }

  getDataForGraph(
    countriesSelected: string[],
    countries: CountryInfoFull,
    data: Record<string, Status>[],
    peopleStatus: States | undefined,
  ): GraphStructure {
    const oCategories: Record<string, undefined> = {};

    countriesSelected.forEach((countrySlug: string): void => {
      Object.keys(data[countrySlug as keyof typeof data]).forEach(
        (date): void => {
          oCategories[date] = undefined;
        },
      );
    });

    const categories = Object.keys(oCategories).sort();

    const series: SeriesOptionsType[] = [];
    countriesSelected.forEach((countrySlug: string): void => {
      const newSeries: SeriesOptionsType = {
        name: this.getCountryName(countrySlug, countries),
        data: Array(categories.length).fill(0),
        type: 'line',
      };

      Object.keys(data[countrySlug as keyof typeof data]).forEach(
        (date): void => {
          const dateIndex = categories.indexOf(date);

          if (newSeries.data) {
            newSeries.data[dateIndex] = [
              date,
              // @ts-ignore
              data[countrySlug][date][peopleStatus],
            ] as [string, number];
          }
        },
      );
      series.push(newSeries);
    });

    return {
      categories,
      series,
    };
  }
}
