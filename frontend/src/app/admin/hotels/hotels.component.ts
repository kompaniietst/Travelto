import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotels',
  template: `
    <div class="container">
      <mat-tab-group animationDuration="0ms">
          
          <mat-tab label="View your hotels">
              <app-view-hotels></app-view-hotels>
          </mat-tab>
          <mat-tab label="Add new hotel">
              <app-add-hotel></app-add-hotel>
          </mat-tab>
        </mat-tab-group>
    </div>
  `,
})
export class HotelsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
