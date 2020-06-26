import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AmenitiesComponent = class AmenitiesComponent {
    constructor() { }
    ngOnInit() { }
};
AmenitiesComponent = __decorate([
    Component({
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
], AmenitiesComponent);
export { AmenitiesComponent };
//# sourceMappingURL=amenities.component.js.map