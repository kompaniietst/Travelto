import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
let GenerateFormStructureService = class GenerateFormStructureService {
    defineStructure(controls$) {
        let group = {};
        controls$.subscribe(x => {
            x.forEach((control) => {
                switch (control.controlType) {
                    case 'input':
                        group[control.key] = control.required
                            ? new FormControl(control.value || '', Validators.required)
                            : new FormControl(control.value || '');
                        break;
                    case 'radio':
                        group[control.key] = this.defineRadioValue(control.options);
                        break;
                    default:
                        group[control.key] = control.required
                            ? new FormControl({ value: this.defineValue(control), disabled: control.disabled } || '', Validators.required)
                            : new FormControl({ value: this.defineValue(control), disabled: control.disabled } || '');
                        break;
                }
            });
        });
        return new FormGroup(group);
    }
    defineRadioValue(options) {
        var i = options.findIndex(x => x.checked);
        return new FormControl(i);
    }
    defineValue(control) {
        return control.options ? [] : null;
    }
};
GenerateFormStructureService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], GenerateFormStructureService);
export { GenerateFormStructureService };
//# sourceMappingURL=generate-form-structure.service.js.map