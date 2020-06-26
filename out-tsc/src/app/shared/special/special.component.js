import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let SpecialComponent = class SpecialComponent {
    constructor() { }
    ngOnInit() { }
    trackById(index, item) {
        return item.id;
    }
};
__decorate([
    Input()
], SpecialComponent.prototype, "specials", void 0);
SpecialComponent = __decorate([
    Component({
        selector: 'app-special',
        templateUrl: './special.component.html',
        styleUrls: ['./special.component.scss']
    })
], SpecialComponent);
export { SpecialComponent };
//# sourceMappingURL=special.component.js.map