import { Component, OnInit } from '@angular/core';
import {CountryEntity} from "../shared/models/country.entity";
import {ActivatedRoute, Router} from "@angular/router";
import {CountryService} from "./country.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {


  countries : CountryEntity[] =[]
  pagesNumber: number;

  sortCriterias: string[] = ['ASC', 'DESC'];

  nameCriterias : string[]=['All','Oceania']

  areaCriterias : string[]=["All", "Smaller Than Lithuania By Area"]

  pageIndex: number=0

  isLoading: boolean=false

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private countryService : CountryService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params)=>{
        if (this.countryService.getCountriesNumber()==0){
          this.isLoading=true
          this.countryService.fetchCountries()
            .subscribe(
              (countries)=>{
                this.setUpCountries(params.page,params.limit,params.region,params.area)
                this.isLoading=false
              }
            )
        }else {
          this.setUpCountries(params.page,params.limit,params.region,params.area)
        }
      }
    )
    this.countryService.countriesSorted.subscribe(
      ()=>{
        const params=this.activatedRoute.snapshot.queryParams
        this.setUpCountries(params.page,params.limit,params.region,params.area)
      }
    )
  }

  sort(event){
    this.countryService.sort(event.value)
  }


  navigateByPage(event: PageEvent) {
    const params=this.activatedRoute.snapshot.queryParams
    this.router.navigate(["/country"],{relativeTo : this.activatedRoute , queryParams : {
        ...params,
        page : event.pageIndex+1
      }}
    )
  }

  filterByArea(event){
    const areaCriteria=event.value == "Smaller Than Lithuania By Area"? true: null
    const params=this.activatedRoute.snapshot.queryParams;
    this.router.navigate(["/country"],{relativeTo : this.activatedRoute , queryParams : {
        ...params,
        area : areaCriteria
      }})
  }


  filterByRegion(event){
    const region=event.value =="Oceania"? "Oceania" : null
    const params=this.activatedRoute.snapshot.queryParams;
    this.router.navigate(["/country"],{relativeTo : this.activatedRoute , queryParams : {
        ...params,
        region : region
      }})
  }

  private setUpCountries(page?,limit?,region?,smallerThan?:boolean){
    const [length, fetchedCountries]=this.countryService.getCountries(page,limit,region,smallerThan)
    this.pageIndex=page-1
    this.countries=fetchedCountries
    this.pagesNumber=length
  }

}
