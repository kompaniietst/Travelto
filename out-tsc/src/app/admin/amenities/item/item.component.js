import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { Control } from 'src/app/core/models/Control';
import { of } from 'rxjs';
let AmenityItemComponent = class AmenityItemComponent {
    constructor(admin, alert) {
        this.admin = admin;
        this.alert = alert;
        this.showSpinner = false;
        this.editItem = false;
    }
    ngOnInit() { }
    edit(_id) {
        this.formStructure$ = of([
            new Control({
                controlType: 'input',
                key: 'label',
                value: this.item.label,
                placeholder: 'Label:',
            }),
            new Control({
                controlType: 'radio',
                key: 'checked',
                value: this.item.checked,
                placeholder: 'Checked:',
                options: [
                    { id: 0, label: 'Not checked', checked: true },
                    { id: 1, label: 'Checked', checked: false },
                ]
            }),
            new Control({
                controlType: 'images',
                key: 'image',
                type: "amenities",
                value: this.item.image,
                options: []
            }),
        ]);
        this.editItem = true;
    }
    rem(_id) {
    }
    cancelEdit() {
        this.editItem = false;
    }
    onSubmit(formData) {
        this.showSpinner = true;
        console.log('on edit', formData);
        this.admin.editAmenity(this.item._id, formData)
            .subscribe(x => {
            console.log('sss', x);
            this.alert.success("Item is successfuly updated");
            this.showSpinner = false;
            setTimeout(() => {
                this.editItem = false;
            }, 1500);
        }, err => console.log(err));
    }
};
__decorate([
    Input()
], AmenityItemComponent.prototype, "item", void 0);
AmenityItemComponent = __decorate([
    Component({
        selector: 'app-amenity-item',
        templateUrl: './item.component.html',
        styleUrls: ['./item.component.scss']
    })
], AmenityItemComponent);
export { AmenityItemComponent };
//# sourceMappingURL=item.component.js.map