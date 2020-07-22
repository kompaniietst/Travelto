import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CitiesService } from '../../services/cities.service';
import { City } from '../../models/City';
import { Observable, of } from 'rxjs';
import { Control } from '../../models/Control';
import { Router, Params } from '@angular/router';
import { SizeDetectorService } from '../../services/size-detector.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  formStructure$: Observable<Control[]>
  isTablet: boolean = false;

  constructor(
    // private citiesService: CitiesService,
    public router: Router,
    private breakpoint: SizeDetectorService,
    private ls: LocalStorageService
  ) {
    // this.citiesService.get()
    //   .subscribe((x: City[]) => {
    //     this.initFormStructure(x)
    //   });

    this.breakpoint.onResize$
      .subscribe((x) => this.isTablet = x < 768 || x == 768)
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
  }
  // initFormStructure(cities: City[]) {
  //   this.formStructure$ = of([
  //     new Control({
  //       controlType: 'dropdown',
  //       key: 'city',
  //       placeholder: 'Destination place',
  //       options: cities
  //     }),
  //     new Control({
  //       controlType: 'dateTimePicker',
  //       key: 'date',
  //       placeholder: 'Check in - check out',
  //     }),
  //     new Control({
  //       controlType: 'pex',
  //       key: 'pex',
  //       placeholder: 'Guests:',
  //       value: { adults: 2, children: 0 }
  //     })
  //   ])
  // }

  onSubmit(formData: any) {

    const queryParams: Params = {};

    if (formData.city != null)
      queryParams["placeId"] = formData.city._id;

    if (formData.city == null)
      delete formData.city;

    if (formData.date == null)
      delete formData.date;

    // if (formData.date) {
    //   queryParams["checkIn"] = formData.date[0];
    //   queryParams["checkOut"] = formData.date[1];
    // }

    this.ls.saveToLocalstorage(formData);
    this.router.navigate(['catalog'], { queryParams: queryParams })
  }
}
