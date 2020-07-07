import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amenities',
  template: `
      <div class="container">
        <mat-tab-group animationDuration="0ms">
            <mat-tab label="View your amenities">
              <app-view-amenities></app-view-amenities>
            </mat-tab>
            <mat-tab label="Add new amenities">
              <app-add-amenities></app-add-amenities>
            </mat-tab>
          </mat-tab-group>
      </div>
  `
})
export class AmenitiesComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}