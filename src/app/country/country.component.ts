import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CountryStatus } from '../country-status';
import { HttpService } from '../http.service';
import { SortService } from '../sortService.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  countrySub: Subscription = new Subscription();
  slug: string | null = '';
  country: string = '';
  countryCode: string = '';
  province: string = '';

  displayedColumns: string[] = [
    'Province',
    'Active',
    'Confirmed',
    'Deaths',
    'Recovered',
    'Date',
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: MatTableDataSource<CountryStatus> =
    new MatTableDataSource<CountryStatus>([]);

  selected: string = this.getLastDays(7);
  daysInThisMonth = new Date().getDate();
  days: { value: string; viewValue: string }[] = [
    { value: this.getLastDays(7), viewValue: 'Last 7 days' },
    { value: this.getLastDays(14), viewValue: 'Last 14 days' },
    {
      value: this.getLastDays(this.daysInThisMonth),
      viewValue: 'Current Month',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    public sortService: SortService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param) => (this.slug = param.get('country'))
    );
    this.getCountryStatus(this.getLastDays(7));
  }

  getCountryStatus(SelecedTimeValue: string) {
    this.countrySub = this.httpService
      .getCountryStatus(this.slug, SelecedTimeValue)
      .subscribe((data) => {
        if (data[0].Province === '' && this.columnsToDisplay.indexOf('Province') > -1) this.columnsToDisplay.shift();
        this.country = data[0].Country;
        this.dataSource = new MatTableDataSource<CountryStatus>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        return;
      });
  }

  getLastDays(daysBefore: number) {
    const today = new Date();
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - daysBefore + 1
    );
    return lastWeek.toISOString().split('T')[0];
  }

  onTimeValueChange(event: any) {
    this.getCountryStatus(event.value);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.countrySub) this.countrySub.unsubscribe();
  }
}
