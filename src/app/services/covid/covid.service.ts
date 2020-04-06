import { Injectable } from '@angular/core';

import { Status } from '../../interfaces';

@Injectable({ providedIn: 'root' })
export class CovidService {
  constructor() {}

  extractData(data): Status[] {
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
}
