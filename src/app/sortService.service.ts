import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Injectable } from "@angular/core";
import { Sort } from "@angular/material/sort";

@Injectable({providedIn: 'root'})

export class SortService {

  constructor(
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
