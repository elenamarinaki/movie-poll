import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, catchError, tap } from 'rxjs';

import { Record } from './record';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  private recordsUrl =
    'https://8gecmtt5ah.execute-api.eu-west-2.amazonaws.com/development4/records';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getRecords(): Observable<Record[]> {
    return this.http
      .get<Record[]>(this.recordsUrl, this.httpOptions)
      .pipe(catchError(this.handleError<Record[]>('getRecords', [])));
  }

  postRecord(record: Record): Observable<Record> {
    return this.http
      .post<Record>(this.recordsUrl, record, this.httpOptions)
      .pipe(
        tap((data) => console.log('postRecord: ' + JSON.stringify(data))),
        catchError(this.handleError<Record>('postRecord', null))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
