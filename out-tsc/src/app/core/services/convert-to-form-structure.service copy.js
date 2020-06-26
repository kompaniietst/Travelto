import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
let ConvertToFormStructureService = class ConvertToFormStructureService {
    convertData(data) {
        var group = {};
        console.log('=========================');
        // console.log(data);
        for (let key of Object.keys(data)) {
            var value = data[key];
            // console.log(key, value);
            if (this.caseInput(key, value)) {
                group[key] = new FormControl(value);
            }
            if (this.caseArray(key, value)) {
                var controls = value.map(v => new FormControl(v));
                group[key] = new FormArray(controls);
            }
            // if (this.caseInput(key, value)) {
            //   group[key] = new FormControl(value);
            // }
        }
        // let group = {};
        // controls$.subscribe(x => {
        //   x.forEach((control: Control) => {
        //     switch (control.controlType) {
        //       case 'input': group[control.key] = control.required
        //         ? new FormControl(control.value || '', Validators.required)
        //         : new FormControl(control.value || '');
        //         break;
        //       case 'radio': group[control.key] = this.defineRadioValue(control.options);
        //         break;
        //       default:
        //         group[control.key] = control.required
        //           ? new FormControl({ value: this.defineValue(control), disabled: control.disabled } || '', Validators.required)
        //           : new FormControl({ value: this.defineValue(control), disabled: control.disabled } || '');
        //         break;
        //     }
        //   })
        // })
        return new FormGroup(group);
    }
    caseInput(key, value) {
        console.log(' ');
        return typeof value != 'object';
    }
    caseArray(key, value) {
        console.log(' ');
        // if (typeof value == 'object' && value.isArray()) {
        // }
        return typeof value == 'object' && value instanceof Array;
    }
};
ConvertToFormStructureService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ConvertToFormStructureService);
export { ConvertToFormStructureService };
//# sourceMappingURL=convert-to-form-structure.service copy.js.map