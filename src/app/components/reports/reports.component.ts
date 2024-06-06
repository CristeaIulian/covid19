import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';

import { CovidService } from '../../services/covid/covid.service';

import { CountryInfo, CountryInfoFull, States, Status } from '../../interfaces';

import dataByCountry from '../../mocks/by_country.json';
import countries from '../../mocks/countries.json';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  countries: CountryInfoFull = {
    full: [],
    partial: [],
  };
  countriesSelected: string[] = [];
  data: Record<string, Status>[] = [];
  pageSize = 10;

  peopleStatuses = [
    {
      label: States.confirmed,
      value: States.confirmed,
      isChecked: true,
    },
    {
      label: States.recovered,
      value: States.recovered,
      isChecked: false,
    },
    {
      label: States.deaths,
      value: States.deaths,
      isChecked: false,
    },
  ];
  showHighcharts = false;
  public pagination = {
    pageSize: 10,
    pageIndex: 0,
    pageSizeOptions: [10, 25, 50, 100, 500, 1000],
    length: 0,
  };

  constructor(private covidService: CovidService) {}

  ngOnInit(): void {
    this.getCountries();
  }

  generateGraph(): void {
    const { categories, series } = this.covidService.getDataForGraph(
      this.countriesSelected,
      this.countries,
      this.data,
      this.covidService.getCurrentState(this.peopleStatuses),
    );

    const chart = Highcharts.chart('chart-line', {
      chart: {
        type: 'line',
      },
      title: {
        text: `Covid-19 / Countries (${this.covidService.getCurrentState(this.peopleStatuses)})`,
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: true,
      },
      yAxis: {
        title: {
          text: 'cases',
        },
      },
      xAxis: {
        type: 'category',
      },
      categories: {
        data: categories,
      },
      tooltip: {
        headerFormat: `<div>Date: {point.key}</div>`,
        pointFormat: `<div>{series.name}: {point.y}</div>`,
        shared: true,
        useHTML: true,
      },
      series,
    } as any);
  }

  getCountries(): void {
    this.countries.full = countries;
    this.countries.partial = this.countries.full.slice(0, this.pageSize);
    this.pagination.length = this.countries.full.length;
  }

  chipClick(country: CountryInfo): void {
    this.countries.partial.forEach((item, index) => {
      if (country.index === item.index) {
        this.countries.partial[index].selected = !item.selected;
        this.countries.partial[index].color = item.selected
          ? 'primary'
          : 'secondary';
        if (item.selected) {
          this.countriesSelected.push(item.slug);
        } else {
          const ndx = this.countriesSelected.indexOf(item.slug);
          if (ndx > -1) {
            this.countriesSelected.splice(ndx, 1);
          }
        }
      }
    });

    this.getDataByCountry(country);
  }

  getDataByCountry(country: CountryInfo): void {
    // @ts-ignore
    if (!this.data[country.slug]) {
      // @ts-ignore
      this.data[country.slug] = dataByCountry[country.countryCode];

      this.generateGraph();
      this.showHighcharts = true;
    } else {
      this.generateGraph();
    }
  }

  public onCheckedItem = (checkedItem: number | string): void => {
    this.peopleStatuses.forEach((status, index) => {
      this.peopleStatuses[index].isChecked = checkedItem === status.value;
    });
    this.generateGraph();
  };

  onPageChanged(newPageNumber: number): void {
    this.pagination.pageIndex = newPageNumber;
    this.filterDataByPaginator();
  }

  public onRecordsPerPageChanged(newRecordsPerPage: number): void {
    this.pagination.pageSize = newRecordsPerPage;
    this.filterDataByPaginator();
  }

  public filterDataByPaginator(): void {
    this.countries.partial = this.countries.full.slice(
      this.pagination.pageIndex * this.pagination.pageSize,
      (this.pagination.pageIndex + 1) * this.pagination.pageSize,
    );
  }
}
