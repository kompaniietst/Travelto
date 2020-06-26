var DropdownComponent_1;
import { __decorate } from "tslib";
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { MatFormFieldControl } from '@angular/material/form-field';
let DropdownComponent = DropdownComponent_1 = class DropdownComponent {
    constructor() {
        this.onChange = (val) => { };
        this.myControl = new FormControl();
    }
    writeValue(obj) { }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) { }
    ngOnInit() {
        if (this.control.value) {
            this.myControl.setValue(this.control.value);
        }
        this.filteredOptions = this.myControl.valueChanges
            .pipe(startWith(''), map(value => this._filter(value)));
        this.myControl.valueChanges.subscribe(x => this.onChange(x));
        this.myControl.valueChanges.subscribe(x => console.log(x));
    }
    _filter(value) {
        const filterValue = value.toLowerCase();
        return this.control.options.filter(option => {
            if (option.label.toLowerCase().includes(filterValue))
                return option;
        });
    }
    displayFn(option) {
        var _a;
        return (_a = option) === null || _a === void 0 ? void 0 : _a.label;
    }
};
__decorate([
    Input()
], DropdownComponent.prototype, "control", void 0);
DropdownComponent = DropdownComponent_1 = __decorate([
    Component({
        selector: 'app-dropdown',
        templateUrl: './dropdown.component.html',
        styleUrls: ['./dropdown.component.scss'],
        providers: [{
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => DropdownComponent_1),
                multi: true
            },
            { provide: MatFormFieldControl, useExisting: DropdownComponent_1 }
        ]
    })
], DropdownComponent);
export { DropdownComponent };
//# sourceMappingURL=dropdown.component.js.map