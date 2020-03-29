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
}
