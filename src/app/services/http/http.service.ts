import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private apiUrl = 'https://api.covid19api.com/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getData(path): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + path).pipe(
      tap(_ => this.log('fetched data')),
      catchError(this.handleError<any[]>('getData', []))
    );
  }

  getDataAll(paths): Observable<any[]>[] {
    const endpoints = [];
    paths.forEach(path => {
      endpoints.push(this.http.get(this.apiUrl + path));
    });

    return endpoints;
  }

  addData(path, data): Observable<any> {
    return this.http.post<any>(this.apiUrl + path, data, this.httpOptions).pipe(
      tap(response => this.log(`added data w/ ${response}`)),
      catchError(this.handleError<any>('addData'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`httpService: ${message}`);
  }
}
