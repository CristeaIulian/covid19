enum States {
  confirmed = 'confirmed',
  recovered = 'recovered',
  deaths = 'deaths'
}

export interface Status {
  confirmed: number;
  recovered: number;
  deaths: number;
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
