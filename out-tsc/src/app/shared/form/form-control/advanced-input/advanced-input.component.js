var AdvancedInputComponent_1;
import { __decorate } from "tslib";
import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormControl, FormArray } from '@angular/forms';
import { DropdownComponent } from '../dropdown/dropdown.component';
let AdvancedInputComponent = AdvancedInputComponent_1 = class AdvancedInputComponent {
    constructor() {
        this.form = new FormGroup({});
    }
    writeValue(obj) { }
    registerOnChange(fn) {
        this.form.get(this.control.key).valueChanges.subscribe(fn);
    }
    registerOnTouched(fn) { }
    setDisabledState(isDisabled) { }
    ngOnInit() {
        switch (this.defineControlType(this.control)) {
            case 'formControl':
                this.form
                    .addControl(this.control.key, new FormControl());
                break;
            case 'formArray':
                this.form
                    .addControl(this.control.key, new FormArray([]));
                break;
            case 'formGroup':
                this.form
                    .addControl(this.control.key, new FormGroup({}));
                this.control.options.forEach(c => {
                    switch (this.defineControlType(c)) {
                        case 'formControl':
                            this.form.get(this.control.key)
                                .addControl(c.key, new FormControl(c.value || null));
                            break;
                        case 'formArray':
                            if (c.controlType == "input") { // MAP
                                var map = [new FormControl(), new FormControl()];
                                if (c.value) {
                                    map = c.value.map(v => new FormControl(v));
                                }
                                this.form.get(this.control.key)
                                    .addControl(c.key, new FormArray(map));
                            }
                            if (c.controlType == "dropdown") {
                                this.form.get(this.control.key)
                                    .addControl(c.key, new FormControl());
                            }
                            break;
                        case 'formGroup':
                            break;
                        default:
                            break;
                    }
                });
                break;
            default:
                break;
        }
    }
    defineControlType(control) {
        if (!control.options) {
            return 'formControl';
        }
        if (control.options && !Array.isArray(control.options)) {
            return 'formArray';
        }
        if (control.options && Array.isArray(control.options)) {
            var hasOtherControls = control.options.some(c => c.hasOwnProperty('controlType'));
            if (hasOtherControls)
                return 'formGroup';
            return 'formArray';
        }
    }
    trackById(index, item) {
        return item.id;
    }
};
__decorate([
    Input()
], AdvancedInputComponent.prototype, "control", void 0);
__decorate([
    ViewChild(DropdownComponent)
], AdvancedInputComponent.prototype, "dropdownComponentRef", void 0);
AdvancedInputComponent = AdvancedInputComponent_1 = __decorate([
    Component({
        selector: 'app-advanced-input',
        templateUrl: './advanced-input.component.html',
        styleUrls: ['./advanced-input.component.scss'],
        providers: [{
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => AdvancedInputComponent_1),
                multi: true
            }]
    })
], AdvancedInputComponent);
export { AdvancedInputComponent };
//# sourceMappingURL=advanced-input.component.js.map