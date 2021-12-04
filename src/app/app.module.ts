import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { CountriesTableComponent } from './countries-table/countries-table.component';
import { CountryComponent } from './country/country.component';
import { HeaderComponent } from './header/header.component';
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CountriesTableComponent,
    CountryComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorsInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
