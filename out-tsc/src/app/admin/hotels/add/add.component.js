import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Control } from 'src/app/core/models/Control';
import { of, forkJoin } from 'rxjs';
let AddHotelComponent = class AddHotelComponent {
    constructor(admin, alert) {
        this.admin = admin;
        this.alert = alert;
        this.showSpinner = false;
        forkJoin(this.admin.getAmenities(), this.admin.getCities())
            .subscribe(x => {
            this.initFormStructure(x[0], x[1]);
        });
    }
    ngOnInit() { }
    initFormStructure(amenities, cities) {
        this.formStructure$ = of([
            new Control({
                controlType: 'input',
                key: 'name',
                placeholder: 'Name:',
                required: true
            }),
            new Control({
                controlType: 'input',
                key: 'stars',
                type: 'number',
                placeholder: 'Stars amount:',
                required: true
            }),
            new Control({
                controlType: 'input',
                key: 'description',
                type: 'textarea',
                placeholder: 'Description:',
                required: true
            }),
            new Control({
                controlType: 'address',
                key: 'address',
                options: [
                    new Control({
                        controlType: 'dropdown',
                        key: 'city',
                        placeholder: 'City:',
                        options: cities,
                        required: true
                    }),
                    new Control({
                        controlType: 'input',
                        key: 'street',
                        placeholder: 'Street:',
                        required: true
                    }),
                    new Control({
                        controlType: 'input',
                        key: 'houseNumber',
                        placeholder: '№:',
                        required: true
                    }),
                    new Control({
                        controlType: 'input',
                        key: 'disctrict',
                        placeholder: 'Disctrict:',
                        required: true
                    }),
                    new Control({
                        controlType: 'input',
                        key: 'map',
                        label: 'Map coordinates:',
                        required: true,
                        options: [
                            { placeholder: 'latitude' },
                            { placeholder: 'longitude' }
                        ]
                    }),
                ]
            }),
            new Control({
                controlType: 'images',
                key: 'images',
                type: 'hotels',
                options: []
            }),
            new Control({
                controlType: 'checkbox',
                key: 'amenities',
                label: 'Choose amenities:',
                options: amenities,
            }),
        ]);
    }
    onSubmit(hotel) {
        console.log('hot', hotel);
        this.showSpinner = true;
        this.admin.registerHotel(hotel)
            .subscribe((x) => {
            this.showSpinner = false;
            this.alert.success('Item is successfully added');
            // this.router.navigate([`/hotel/${x._id}`])
        }, err => this.alert.error(err.error));
    }
};
AddHotelComponent = __decorate([
    Component({
        selector: 'app-add-hotel',
        templateUrl: './add.component.html',
        styleUrls: ['./add.component.scss']
    })
], AddHotelComponent);
export { AddHotelComponent };
//# sourceMappingURL=add.component.js.map