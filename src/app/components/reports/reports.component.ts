import { Component, OnInit } from '@angular/core';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { MatLegacyRadioChange as MatRadioChange } from '@angular/material/legacy-radio';

import * as Highcharts from 'highcharts';

import { CovidService } from '../../services/covid/covid.service';

import { CountryInfo, States } from '../../interfaces';

import dataByCountry from '../../mocks/by_country.json';
import countries from '../../mocks/countries.json';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  countries = {
    full: [],
    partial: [],
  };
  countriesSelected = [];
  data = [];
  pageSize = 10;
  peopleStatuses = [
    { value: States.confirmed, checked: true },
    { value: States.recovered, checked: false },
    { value: States.deaths, checked: false },
  ];
  peopleStateSelected = 'confirmed';
  showHighcharts = false;

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
  }

  chipClick(country: CountryInfo): void {
    this.countries.partial.forEach((item, index) => {
      if (country.index === item.index) {
        this.countries.partial[index].selected = !item.selected;
        this.countries.partial[index].color = item.selected ? 'primary' : 'secondary';
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
    if (!this.data[country.slug]) {
      this.data[country.slug] = dataByCountry[country.countryCode];
      this.generateGraph();
      this.showHighcharts = true;
    } else {
      this.generateGraph();
    }
  }

  changeState(e: MatRadioChange) {
    this.peopleStatuses.forEach((status, index) => {
      this.peopleStatuses[index].checked = e.value === status.value;
    });
    this.generateGraph();
  }

  handlePage($event: PageEvent): void {
    this.countries.partial = this.countries.full.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize);
  }
}
