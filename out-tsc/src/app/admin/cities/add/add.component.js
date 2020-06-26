import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Control } from 'src/app/core/models/Control';
import { of } from 'rxjs';
let AddCitiesComponent = class AddCitiesComponent {
    constructor(admin, alert, route, http) {
        this.admin = admin;
        this.alert = alert;
        this.route = route;
        this.http = http;
        this.showSpinner = false;
        this.formStructure$ = of([
            new Control({
                controlType: 'input',
                key: 'label',
                placeholder: 'City name:',
            })
        ]);
    }
    onSubmit(formData) {
        this.showSpinner = true;
        this.admin.registerCity(formData)
            .subscribe(_ => {
            this.showSpinner = false;
            this.alert.success('Item is successfuly added.');
        }),
            error => console.log(error);
    }
    ngOnInit() { }
};
AddCitiesComponent = __decorate([
    Component({
        selector: 'app-add-cities',
        templateUrl: './add.component.html',
        styleUrls: ['./add.component.scss']
    })
], AddCitiesComponent);
export { AddCitiesComponent };
//# sourceMappingURL=add.component.js.map