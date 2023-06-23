import { Injectable } from '@angular/core';
import {CountryEntity} from "../shared/models/country.entity";
import {map, Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CountryDto} from "../shared/models/interfaces/country.dto";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private httpClient : HttpClient
  ) { }

  private countries : CountryEntity[]=[]

  countriesSorted = new Subject<void>()


  fetchCountries(){
    return this.httpClient.get<CountryDto[]>(environment.baseUrl)
      .pipe(
        map((countryDtoArray)=>{
           const countries =countryDtoArray.map<CountryEntity>((countryDto)=>{
            const {independent, ...country}=countryDto
            const newCountry : CountryEntity={
              ...country,
              latlng : country.latlng ?? null
            }
            return newCountry
          })
          return countries
        }),
        tap(
          (countries)=>{
              this.setCountries(countries)
          }
        )
      )
  }

  getCountries(page: number=1,limit : number=15,region? : string,smallerThan?: boolean) : [number , CountryEntity[]]{
    let countries=[]
    if (region!=null){
      this.countries.forEach(
        (country)=>{
          if (country.region==region){
            countries.push(country)
          }
        }
      )
    }else {
      countries=this.countries
    }
    if (smallerThan){
      const lithuania=this.countries.find((element)=>element.name=="Lithuania")
      countries=countries.filter((element)=>element.area<lithuania.area)
    }
    const length=countries.length
    if (length==0){
      return [0,[]];
    }
    const pageNumbers=Math.ceil(length/limit)
    let start=(page-1)*limit
    let end=null
    if (page!=pageNumbers){
      end=start+limit
      return [length , countries.slice(start,end)]
    }else {
      return [length , countries.slice(start)]
    }

  }

  getCountriesNumber(){
    return this.countries.length
  }

  setCountries(countries : CountryEntity[]){
    this.countries=countries
  }

  sort(criteria : string){
    if (criteria=="ASC"){
      this.countries.sort((a,b)=>a.name.localeCompare(b.name))
    }else {
      this.countries.sort((a,b)=>b.name.localeCompare(a.name))
    }
    this.countriesSorted.next()
  }

}
