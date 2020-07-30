import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Control } from '../../models/Control';
import { Router, Params } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ViewportSizeDetector } from '../../extends/ViewportSizeDetector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends ViewportSizeDetector {

  formStructure$: Observable<Control[]>

  @HostListener('window:resize', ['$event'])
  onResize = () => this.defineScreenSize();

  constructor(
    public router: Router,
    private ls: LocalStorageService,
    breakpointObserver: BreakpointObserver
  ) {
    super(breakpointObserver);
    this.defineScreenSize()
  }

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
