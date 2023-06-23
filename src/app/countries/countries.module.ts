import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesComponent } from './countries.component';
import { CountryCardComponent } from './country-card/country-card.component';
import {CountriesRoutingModule} from "./countries-routing.module";
import {SharedModule} from "../shared/shared.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatRadioModule} from "@angular/material/radio";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@NgModule({
  declarations: [
    CountriesComponent,
    CountryCardComponent
  ],
    imports: [
        CommonModule,
        CountriesRoutingModule,
        SharedModule,
        MatExpansionModule,
        MatListModule,
        MatPaginatorModule,
        MatRadioModule,
        MatProgressSpinnerModule,
    ]
})
export class CountriesModule { }
