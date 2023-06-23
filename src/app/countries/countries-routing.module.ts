import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CountriesComponent} from "./countries.component";
import {CountryCardComponent} from "./country-card/country-card.component";


const routes : Routes=[
  {path : "country" , component : CountriesComponent},
  {path : "item" , component : CountryCardComponent}
]




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CountriesRoutingModule { }
