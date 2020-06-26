import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { Control } from 'src/app/core/models/Control';
import { CustomCurrencyPipe } from 'src/app/pipes/customCurrency.pipe';
class HoteInfo {
}
let RoomItemComponent = class RoomItemComponent {
    constructor(admin, alert) {
        this.admin = admin;
        this.alert = alert;
        this.loading = true;
        this.showSpinner = false;
        this.editItem = false;
        this.admin.getHotels() // get hotels for editing curr room
            .subscribe(x => {
            var hotels = x.map(h => { return { _id: h._id, label: h.name }; });
            this.initFormStructure(hotels);
        });
    }
    edit(_id) {
        this.editItem = true;
    }
    initFormStructure(hotels) {
        this.formStructure$ = of([
            new Control({
                controlType: 'dropdown',
                key: 'hotel_id',
                label: 'Select hotel name',
                value: hotels.find(h => h._id == this.item.hotel_id),
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
                label: 'Price',
                type: 'number',
                placeholder: '$ Price: (per night)',
                required: true
            }),
            new Control({
                controlType: 'checkbox',
                key: 'specials',
                label: 'Choose specials:',
                value: this.item.specials,
                options: [
                    { _id: "1", label: "25%" },
                    { _id: "2", label: "Рекомендуем" },
                    { _id: "3", label: "Лучшая цена" }
                ],
            }),
            new Control({
                controlType: 'textFeatures',
                key: 'textFeatures',
                label: 'Room features:',
                value: this.item.textFeatures,
                placeholder: 'Field:',
            }),
            new Control({
                controlType: 'images',
                key: 'images',
                type: 'rooms',
                value: this.item.images,
                options: []
            }),
        ]);
    }
    cancelEdit() {
        this.editItem = false;
    }
    ngOnInit() {
        this.loading = true;
        this.admin.getHotelBy(this.item.hotel_id)
            .subscribe((x) => {
            this.loading = false;
            this.hotelInfo = { _id: x._id, name: x.name, stars: x.stars };
        });
    }
    onSubmit(formData) {
        this.showSpinner = true;
        console.log('on edit', formData);
        this.admin.editRoom(this.item._id, formData)
            .subscribe(x => {
            console.log('sss', x);
            this.alert.success("Item is successfuly updated");
            this.showSpinner = false;
            setTimeout(() => { this.editItem = false; }, 1500);
        }, err => console.log(err));
    }
};
__decorate([
    Input()
], RoomItemComponent.prototype, "item", void 0);
RoomItemComponent = __decorate([
    Component({
        selector: 'app-room-item',
        templateUrl: './item.component.html',
        styleUrls: ['./item.component.scss'],
        providers: [CustomCurrencyPipe]
    })
], RoomItemComponent);
export { RoomItemComponent };
//# sourceMappingURL=item.component.js.map