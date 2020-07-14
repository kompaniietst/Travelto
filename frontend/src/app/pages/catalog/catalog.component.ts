import { Component, OnInit } from '@angular/core';
import { SizeDetectorService } from 'src/app/core/services/size-detector.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {

  showFilters: boolean = false;
  isTablet: boolean = false;

  constructor(
    private breakpoint: SizeDetectorService
  ) {

    this.breakpoint.onResize$
      .subscribe((x) => this.isTablet = x < 768 || x == 768)
  }
}
