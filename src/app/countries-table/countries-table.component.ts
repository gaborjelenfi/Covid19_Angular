import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CovidData, CountriesData } from '../covid-data';
import { HttpService } from '../http.service';
import { SortService } from '../sortService.service';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.css'],
})
export class CountriesTableComponent
  implements OnInit, OnDestroy
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  covidDatasSub: Subscription = new Subscription();
  covidDatas: CovidData = {
    Countries: [],
    ID: '',
    Message: '',
    Global: {},
    Date: '',
  };
  today: Date = new Date();
  displayedColumns: string[] = [
    'Country',
    'CountryCode',
    'NewConfirmed',
    'NewDeaths',
    'NewRecovered',
    'TotalConfirmed',
    'TotalDeaths',
    'TotalRecovered',
  ];
  dataSource: MatTableDataSource<CountriesData> = new MatTableDataSource<CountriesData>([]);

  constructor(
    private httpService: HttpService,
    public sortService: SortService
  ) {}

  ngOnInit(): void {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.Country.toLowerCase().includes(filter);
    };
    this.getCovidDatas();
  }

  getCovidDatas(): void {
    this.covidDatasSub = this.httpService.getCovidDatas().subscribe((datas) => {
      this.covidDatas.ID = datas.ID;
      this.covidDatas.Countries.push(...datas.Countries);
      this.covidDatas.Message = datas.Message;
      this.covidDatas.Global = datas.Global;
      this.covidDatas.Date = datas.Date;
      this.dataSource = new MatTableDataSource<CountriesData>(
        this.covidDatas.Countries
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      return;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if(this.covidDatasSub) this.covidDatasSub.unsubscribe();
  }
}
