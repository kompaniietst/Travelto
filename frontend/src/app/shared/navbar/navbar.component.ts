import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Control } from 'src/app/core/models/Control';
import { CitiesService } from 'src/app/core/services/cities.service';
import { Router } from '@angular/router';
import { City } from 'src/app/core/models/City';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  formStructure$: Observable<Control[]>
  isCatalog = false;

  constructor(
    private citiesService: CitiesService,
    public router: Router,
    private ls: LocalStorageService
  ) {
    this.citiesService.get()
      .subscribe((x: City[]) => {
        this.initFormStructure(x)
      });
  }

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

  ngOnInit(): void { }
  onSubmit(formData: any) {
    this.ls.saveToLOcalstorage(formData);
  }
  
}
