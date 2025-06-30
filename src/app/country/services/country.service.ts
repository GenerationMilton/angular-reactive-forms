import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountryService {

    private baseUrl = 'https://restcountries.com/v3.1';
    http = inject(HttpClient);

    //objeto continentes
    private _regions = [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania'
    ];

    get regions(): string[]{
        return[...this._regions];
    }

    getCountriesByRegion(region:string):Observable<Country[]>{

        //validation if region is null
        if(!region)return of([]);

        //url with fields
        const url = `${this.baseUrl}/region/${region}?fields=cca,name,borders`;
        return this.http.get<Country[]>(url);

    }

    //get cod name of country
    getCountryByAlphaCode(alphaCode: string): Observable<Country>{
        const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
        return this.http.get<Country>(url);
    }
    
    //get Country by codes
    getCountryBorderByCodes(borders: string[]){
        //TODO:
    }

}