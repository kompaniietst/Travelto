import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Control } from '../models/Control';
let ConvertToFormStructureService = class ConvertToFormStructureService {
    constructor(admin) {
        this.admin = admin;
        this.admin.getAmenities()
            .subscribe((x) => {
            // console.log('>>>>', x)
            this.amenities = x;
        });
    }
    convertData(data) {
        var controls = [];
        // console.log('=========================');
        // console.log(data);
        for (let key of Object.keys(data)) {
            var value = data[key];
            // console.log(key, value);
            if (key == '_id')
                continue;
            if (this.caseInput(key, value) && key == 'description') {
                controls.push(new Control({
                    controlType: 'input',
                    key: key,
                    value: value,
                    type: 'textarea',
                    label: this.convertFirstLetter(key) + ':',
                    placeholder: this.convertFirstLetter(key) + ':',
                }));
                continue;
            }
            if (this.caseInput(key, value)) {
                controls.push(new Control({
                    controlType: 'input',
                    key: key,
                    value: value,
                    type: isNaN(value) ? 'text' : 'number',
                    label: this.convertFirstLetter(key) + ':',
                    placeholder: this.convertFirstLetter(key) + ':',
                }));
            }
            if (this.caseArray(key, value)) {
                if (key == "images") {
                    controls.push(new Control({
                        controlType: 'images',
                        key: key,
                        options: value
                    }));
                    continue;
                }
                if (key == "amenities") {
                    var formAmenities = this.amenities.map((a) => {
                        return {
                            _id: a._id,
                            label: a.label,
                            checked: data.amenities.some(d => d == a._id) ? true : false
                        };
                    });
                    controls.push(new Control({
                        controlType: 'checkbox',
                        key: key,
                        label: this.convertFirstLetter(key) + ':',
                        options: formAmenities
                    }));
                    continue;
                }
                controls.push(new Control({
                    controlType: 'input',
                    key: key,
                    label: this.convertFirstLetter(key) + ':',
                    options: data.map
                }));
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
        return controls;
    }
    convertFirstLetter(key) {
        return key.slice(0, 1).toUpperCase() + key.slice(1);
    }
    caseInput(key, value) {
        return typeof value != 'object';
    }
    caseArray(key, value) {
        return typeof value == 'object' && value instanceof Array;
    }
};
ConvertToFormStructureService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ConvertToFormStructureService);
export { ConvertToFormStructureService };
//# sourceMappingURL=convert-to-form-structure.service.js.map