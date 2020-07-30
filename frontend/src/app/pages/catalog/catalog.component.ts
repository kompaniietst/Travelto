import { Component, HostListener } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ViewportSizeDetector } from 'src/app/core/extends/ViewportSizeDetector';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent extends ViewportSizeDetector {

  showFilters: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize = () => this.defineScreenSize();

  constructor(
    breakpointObserver: BreakpointObserver
  ) {
    super(breakpointObserver);
    this.defineScreenSize()
  }
}
