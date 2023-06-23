import {Component, Input, OnInit} from '@angular/core';
import {CountryEntity} from "../../shared/models/country.entity";



@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.css']
})
export class CountryCardComponent implements OnInit {

  @Input() country : CountryEntity

  constructor() { }

  ngOnInit(): void {
  }





}
