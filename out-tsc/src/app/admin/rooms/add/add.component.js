import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Control } from 'src/app/core/models/Control';
import { of } from 'rxjs';
let AddRoomComponent = class AddRoomComponent {
    constructor(admin, alert) {
        this.admin = admin;
        this.alert = alert;
        this.showSpinner = false;
        this.admin.getHotels()
            .subscribe(x => {
            var hotels = x.map(h => { return { _id: h._id, label: h.name }; });
            this.initFormStructure(hotels);
        });
    }
    ngOnInit() { }
    initFormStructure(hotels) {
        this.formStructure$ = of([
            new Control({
                controlType: 'dropdown',
                key: 'hotel_info',
                label: 'Select hotel name',
                options: hotels,
                required: true
            }),
            new Control({
                controlType: 'input',
                key: 'name',
                placeholder: 'Name:',
                required: true
            }),
            new Control({
                controlType: 'input',
                type: 'textarea',
                key: 'description',
                placeholder: 'Description:',
                required: true
            }),
            new Control({
                controlType: 'input',
                key: 'price',
                type: 'number',
                placeholder: '$ Price: (per night)',
                required: true
            }),
            new Control({
                controlType: 'textFeatures',
                key: 'textFeatures',
                label: 'Add features to this room:',
                placeholder: 'Field:',
            }),
            new Control({
                controlType: 'images',
                key: 'images',
                type: 'rooms',
                options: []
            }),
            new Control({
                controlType: 'checkbox',
                key: 'specials',
                label: 'Choose specials:',
                options: [
                    { _id: "1", label: "25%" },
                    { _id: "2", label: "Recommend" },
                    { _id: "3", label: "Best price" }
                ],
            }),
        ]);
    }
    onSubmit(room) {
        this.showSpinner = true;
        this.admin.registerRoom(room)
            .subscribe((_) => {
            this.showSpinner = false;
            console.log('respRoom', _);
            //this.router.navigate([`/room/${_._id}`])
            this.alert.success('Item is successfully added');
        }, err => this.alert.error(err.error));
    }
};
AddRoomComponent = __decorate([
    Component({
        selector: 'app-add-room',
        templateUrl: './add.component.html',
        styleUrls: ['./add.component.scss']
    })
], AddRoomComponent);
export { AddRoomComponent };
//# sourceMappingURL=add.component.js.map