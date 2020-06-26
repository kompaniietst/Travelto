import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Control } from 'src/app/core/models/Control';
import { of } from 'rxjs';
let AddAmenitiesComponent = class AddAmenitiesComponent {
    constructor(admin, alert) {
        this.admin = admin;
        this.alert = alert;
        this.showSpinner = false;
        this.formStructure$ = of([
            new Control({
                controlType: 'input',
                key: 'label',
                placeholder: 'Label:',
            }),
            new Control({
                controlType: 'radio',
                key: 'checked',
                placeholder: 'Checked:',
                options: [
                    { id: 0, label: 'Not checked', checked: true },
                    { id: 1, label: 'Checked', checked: false },
                ]
            }),
            new Control({
                controlType: 'images',
                key: 'images',
                type: "amenities",
                options: []
            }),
        ]);
    }
    onSubmit(formData) {
        this.showSpinner = true;
        this.admin.registerAmenity(formData)
            .subscribe(_ => {
            this.showSpinner = false;
            this.alert.success('Item is successfuly added.');
        }),
            err => this.alert.error(err.error);
    }
    ngOnInit() { }
};
AddAmenitiesComponent = __decorate([
    Component({
        selector: 'app-add-amenities',
        templateUrl: './add.component.html',
        styleUrls: ['./add.component.scss']
    })
], AddAmenitiesComponent);
export { AddAmenitiesComponent };
//# sourceMappingURL=add.component.js.map