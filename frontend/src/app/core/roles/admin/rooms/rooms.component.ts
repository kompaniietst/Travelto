import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms',
  template: `
        <mat-tab-group animationDuration="0ms">
          <mat-tab label="View your rooms">
            <app-view-rooms></app-view-rooms>
          </mat-tab>
          <mat-tab label="Add new room">
              <app-add-room></app-add-room>
          </mat-tab>
        </mat-tab-group>
  `,
})
export class RoomsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
