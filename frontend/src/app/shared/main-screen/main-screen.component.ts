import { Component, OnInit, forwardRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Control } from 'src/app/core/models/Control';
import { CitiesService } from 'src/app/core/services/cities.service';
import { Hotel } from 'src/app/core/models/Hotel';
import { City } from 'src/app/core/models/City';
import { Params, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {

  formStructure$: Observable<Control[]>

  constructor(
    private citiesService: CitiesService,
    private router: Router,
    private ls: LocalStorageService) {

    this.citiesService.get()
      .pipe(tap(x=>console.log('x', x)))
      .subscribe((x: City[]) => {

        this.initFormStructure(x)
      });
  }

  ngOnInit(): void { }

  initFormStructure(cities: City[]) {
    this.formStructure$ = of([
      new Control({
        controlType: 'dropdown',
        key: 'city',
        placeholder: 'Destination place',
        options: cities
      }),
      new Control({
        controlType: 'dateTimePicker',
        key: 'date',
        placeholder: 'Check in - check out',
      }),
      new Control({
        controlType: 'pex',
        key: 'pex',
        placeholder: 'Guests:',
        value: { adults: 2, children: 0 }
      })
    ])
  }

  onSubmit(formData: any) {

    const queryParams: Params = {};

    if (formData.city == null)
      delete formData.city;

    if (formData.city != null)
      queryParams["placeId"] = formData.city._id;


    if (formData.date == null)
      delete formData.date;

    if (formData.date) {
      queryParams["checkIn"] = formData.date[0];
      queryParams["checkOut"] = formData.date[1];
    }

    this.ls.saveToLOcalstorage(formData);
    this.router.navigate(['catalog'], { queryParams: queryParams })
  }
}
