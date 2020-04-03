import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private http: HttpClient) {
  }

  getConfirmedCases() {
    return this.http.get<any>("https://ncovph.com/api/confirmed-cases");
  }

  getOfwCases() {
    return this.http.get<any>("https://ncovph.com/api/ofw-cases");
  }

  getForeignNationalCases() {
    return this.http.get<any>("https://ncovph.com/api/foreign-national-cases");
  }

  getCounts() {
    return this.http.get<any>("https://ncovph.com/api/counts");
  }
}
