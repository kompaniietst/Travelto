import { __decorate } from "tslib";
import { Component } from '@angular/core';
let RoomsComponent = class RoomsComponent {
    constructor() { }
    ngOnInit() { }
};
RoomsComponent = __decorate([
    Component({
        selector: 'app-rooms',
        template: `
      <div class="container">
        <mat-tab-group animationDuration="0ms">
          <mat-tab label="View your rooms">
            <app-view-rooms></app-view-rooms>
          </mat-tab>
          <mat-tab label="Add new room">
              <app-add-room></app-add-room>
          </mat-tab>
        </mat-tab-group>
    </div>
  `,
    })
], RoomsComponent);
export { RoomsComponent };
//# sourceMappingURL=rooms.component.js.map