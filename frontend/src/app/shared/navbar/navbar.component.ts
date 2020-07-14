import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Control } from 'src/app/core/models/Control';
import { CitiesService } from 'src/app/core/services/cities.service';
import { Router, Params } from '@angular/router';
import { City } from 'src/app/core/models/City';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { SizeDetectorService } from 'src/app/core/services/size-detector.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  formStructure$: Observable<Control[]>
  isCatalog = false;
  isTablet: boolean = false;
  showSearch: boolean = false;

  constructor(
    public router: Router,
    private breakpoint: SizeDetectorService
  ) {

    this.breakpoint.onResize$
      .subscribe((x) => this.isTablet = x < 768 || x == 768)
  }

  ngOnInit(): void { }
}
