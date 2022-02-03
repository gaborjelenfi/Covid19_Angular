import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesTableComponent } from './countries-table/countries-table.component';
import { CountryComponent } from './country/country.component';
const routes: Routes = [
  { path: '', redirectTo: 'countries', pathMatch: 'full'},
  { path: 'countries', component:CountriesTableComponent },
  { path: 'countries/:country', component: CountryComponent },
  { path: '**', component: CountriesTableComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
