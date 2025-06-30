import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {

  fb = inject(FormBuilder);

  countryService = inject(CountryService);
  //consume service
  regions = signal(this.countryService.regions);
  //consume service
  countriesByRegion = signal<Country[]>([]);
  //consume service
  borders = signal<Country[]>([]);

  //validations of forms
  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  })

  //Subscribe with signals
  onFormChanged = effect(( onCleanup )=>{
    
    const regionSubscription = this.onRegionChanged();
  
    onCleanup(()=>{
      regionSubscription.unsubscribe();
      //console.log('limpiado');
    })

  });

  //subscribe to changes of myForm with subscribe
  onRegionChanged(){
    return this.myForm.get('region')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(()=> this.myForm.get('border')!.setValue('')),
        tap(()=>{
          this.borders.set([]);
          this.countriesByRegion.set([]);
        }),
        switchMap( region => this.countryService.getCountriesByRegion(region ?? ''))
      )
      .subscribe(countries => {
        this.countriesByRegion.set(countries);
      console.log({countries});
    });
  }

  


 }
