var TextFeaturesComponent_1;
import { __decorate } from "tslib";
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormArray, FormControl } from '@angular/forms';
let TextFeaturesComponent = TextFeaturesComponent_1 = class TextFeaturesComponent {
    constructor() {
        this.form = new FormGroup({});
    }
    get controls() {
        return this.form.get(this.control.key).controls;
    }
    writeValue(obj) { }
    registerOnTouched(fn) { }
    registerOnChange(fn) {
        this.form.get(this.control.key).valueChanges.subscribe(fn);
    }
    ngOnInit() {
        this.defaultData = this.control.value;
        if (this.defaultDataExist()) {
            var formControls = this.defaultData.map(d => new FormControl(d));
            this.form.addControl(this.control.key, new FormArray(formControls));
        }
        this.form.addControl(this.control.key, new FormArray([new FormControl()]));
    }
    addField() {
        this.form.get(this.control.key).push(new FormControl());
    }
    removeField(i) {
        this.form.get(this.control.key).removeAt(i);
    }
    defaultDataExist() {
        return this.control.value ? true : false;
    }
};
__decorate([
    Input()
], TextFeaturesComponent.prototype, "control", void 0);
TextFeaturesComponent = TextFeaturesComponent_1 = __decorate([
    Component({
        selector: 'app-text-features',
        templateUrl: './text-features.component.html',
        styleUrls: ['./text-features.component.scss'],
        providers: [{
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => TextFeaturesComponent_1),
                multi: true
            }]
    })
], TextFeaturesComponent);
export { TextFeaturesComponent };
//# sourceMappingURL=text-features.component.js.map