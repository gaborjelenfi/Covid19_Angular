import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CountryStatus } from "./country-status";
import { CovidData } from "./covid-data";
import { environment as env } from "../environments/environment"

@Injectable({providedIn: 'root'})

export class HttpService {


  constructor(private http: HttpClient) {}

  getCovidDatas(): Observable<CovidData> {
    return this.http.get<CovidData>(`${env.BASED_URL}/summary`);
  }

  getCountryStatus(country: string | null, dateString: string): Observable<CountryStatus[]> {
    return this.http.get<CountryStatus[]>(`${env.BASED_URL}/live/country/${country}/status/confirmed/date/${dateString}T00:00:00Z`);
  }

}

