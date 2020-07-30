import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Control } from 'src/app/core/models/Control';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ViewportSizeDetector } from '../../core/extends/ViewportSizeDetector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends ViewportSizeDetector implements OnInit {

  formStructure$: Observable<Control[]>
  isCatalog = false;
  showSearch: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize = () => this.defineScreenSize();

  constructor(
    public router: Router,
    breakpointObserver: BreakpointObserver
  ) {
    super(breakpointObserver);
    this.defineScreenSize()
  }

  ngOnInit(): void { }
}
