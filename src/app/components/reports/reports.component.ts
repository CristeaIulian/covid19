import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Chart } from 'angular-highcharts';

import { HttpService } from '../../services/http/http.service';
import { CovidService } from '../../services/covid/covid.service';

import { CountryInfo, PageRange } from '../../interfaces';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  angularHighchart: Chart;
  countries = {
    full: [],
    partial: []
  };
  countriesSelected = [];
  data = [];
  pageSize = 20;
  peopleStatuses = [
    { value: 'confirmed', checked: true },
    { value: 'recovered', checked: false },
    { value: 'deaths', checked: false }
  ];
  peopleStateSelected = 'confirmed';
  showHighchart = false;

  constructor(
    private httpService: HttpService,
    private covidService: CovidService
  ) {}

  ngOnInit(): void {
    this.getCountries();
  }

  generateGraph(): void {
    const { categories, series } = this.covidService.getDataForGraph(
      this.countriesSelected,
      this.countries,
      this.data,
      this.peopleStatuses
    );

    this.angularHighchart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: `Covid-19 / Countries (${this.covidService.getCurrentState(
          this.peopleStatuses
        )})`
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories
      },
      series
    });
  }

  getCountries(): void {
    const path = 'summary';
    this.httpService.getData(path).subscribe((data: any) => {
      this.countries.full = [];
      let index = 0;
      data.Countries.forEach(item => {
        if (item.Country.trim() !== '') {
          this.countries.full.push({
            Country: item.Country.trim(),
            Slug: item.Slug,
            TotalConfirmed: item.TotalConfirmed,
            TotalDeaths: item.TotalDeaths,
            TotalRecovered: item.TotalRecovered,
            index: index++,
            selected: false,
            color: 'secondary'
          });
        }
      });

      this.countries.partial = this.countries.full.slice(0, this.pageSize);
    });
  }

  chipClick(country: CountryInfo): void {
    this.countries.partial.forEach((item, index) => {
      if (country.index === item.index) {
        this.countries.partial[index].selected = !item.selected;
        this.countries.partial[index].color = item.selected
          ? 'primary'
          : 'secondary';
        if (item.selected) {
          this.countriesSelected.push(item.Slug);
        } else {
          const ndx = this.countriesSelected.indexOf(item.Slug);
          if (ndx > -1) {
            this.countriesSelected.splice(ndx, 1);
          }
        }
      }
    });

    this.getDataByCountry(country);
  }

  getDataByCountry(country: CountryInfo): void {
    if (!this.data[country.Slug]) {
      const paths = [];
      this.peopleStatuses.forEach(status =>
        paths.push(`country/${country.Slug}/status/${status.value}`)
      );

      forkJoin(this.httpService.getDataAll(paths)).subscribe(result => {
        this.data[country.Slug] = this.covidService.extractData(result);

        this.generateGraph();
        this.showHighchart = true;
      });
    } else {
      this.generateGraph();
    }
  }

  handlePage(e: any): PageRange {
    return {
      start: e.pageIndex * e.pageSize,
      end: (e.pageIndex + 1) * e.pageSize
    };
  }

  handleCountriesPage(e: any): void {
    const { start, end } = this.handlePage(e);
    this.countries.partial = this.countries.full.slice(start, end);
  }
}
