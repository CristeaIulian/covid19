import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Chart } from 'angular-highcharts';

import { HttpService } from '../../services/http/http.service';
import { CovidService } from '../../services/covid/covid.service';

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

  prepareDataForGraph() {
    const oCategories = {};

    this.countriesSelected.forEach(countrySlug => {
      Object.keys(this.data[countrySlug]).forEach(date => {
        oCategories[date] = undefined;
      });
    });

    const categories = Object.keys(oCategories).sort();

    const series = [];
    this.countriesSelected.forEach(countrySlug => {
      const newSerie = {
        name: this.getCountryName(countrySlug),
        data: Array(categories.length).fill(0)
      };

      Object.keys(this.data[countrySlug]).forEach(date => {
        const dateIndex = categories.indexOf(date);
        newSerie.data[dateIndex] = this.data[countrySlug][date][
          this.getCurrentState()
        ];
      });
      series.push(newSerie);
    });

    return {
      categories,
      series
    };
  }

  getCountryName(countrySlug: string) {
    return this.countries.full.find(country => country.Slug === countrySlug)
      .Country;
  }

  getCurrentState() {
    return this.peopleStatuses.find(status => status.checked).value;
  }

  changeState($event) {
    this.peopleStatuses.forEach((status, index) => {
      this.peopleStatuses[index].checked =
        $event.value === status.value ? true : false;
    });
    this.generateGraph();
  }

  generateGraph() {
    const { categories, series } = this.prepareDataForGraph();

    this.angularHighchart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: `Covid-19 / Countries (${this.getCurrentState()})`
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

  getCountries() {
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

  chipClick(country) {
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

  getDataByCountry(country: any) {
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

  handlePage(e: any) {
    return {
      start: e.pageIndex * e.pageSize,
      end: (e.pageIndex + 1) * e.pageSize
    };
  }

  handleCountriesPage(e: any) {
    const { start, end } = this.handlePage(e);
    this.countries.partial = this.countries.full.slice(start, end);
  }
}
