import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cities',
  template: `
      <div class="container">
        <mat-tab-group animationDuration="0ms">
            <mat-tab label="View your cities">
              <app-view-cities></app-view-cities>
            </mat-tab>
            <mat-tab label="Add new city">
              <app-add-cities></app-add-cities>
            </mat-tab>
          </mat-tab-group>
      </div>
  `
})
export class CitiesComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}