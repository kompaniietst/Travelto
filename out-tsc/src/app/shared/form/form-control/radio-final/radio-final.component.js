var RadioFinalComponent_1;
import { __decorate } from "tslib";
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
let RadioFinalComponent = RadioFinalComponent_1 = class RadioFinalComponent {
    constructor() {
        this.onChange = (value) => { };
    }
    writeValue(obj) { }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) { }
    ngOnInit() { }
    onSelect(i) {
        this.onChange(i);
    }
};
__decorate([
    Input()
], RadioFinalComponent.prototype, "control", void 0);
RadioFinalComponent = RadioFinalComponent_1 = __decorate([
    Component({
        selector: 'app-radio-final',
        templateUrl: './radio-final.component.html',
        styleUrls: ['./radio-final.component.scss'],
        providers: [{
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => RadioFinalComponent_1),
                multi: true
            }]
    })
], RadioFinalComponent);
export { RadioFinalComponent };
//# sourceMappingURL=radio-final.component.js.map