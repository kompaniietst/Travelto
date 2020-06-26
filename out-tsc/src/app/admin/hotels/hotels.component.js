import { __decorate } from "tslib";
import { Component } from '@angular/core';
let HotelsComponent = class HotelsComponent {
    constructor() { }
    ngOnInit() { }
};
HotelsComponent = __decorate([
    Component({
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
], HotelsComponent);
export { HotelsComponent };
//# sourceMappingURL=hotels.component.js.map