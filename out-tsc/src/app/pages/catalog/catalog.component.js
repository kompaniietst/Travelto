import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { of, forkJoin } from 'rxjs';
import { Control } from 'src/app/core/models/Control';
import { CustomCurrencyPipe } from 'src/app/pipes/customCurrency.pipe';
let CatalogComponent = class CatalogComponent {
    constructor(roomService, amenitiesService, citiesService) {
        this.roomService = roomService;
        this.amenitiesService = amenitiesService;
        this.citiesService = citiesService;
        this.rooms$ = this.roomService.get();
        forkJoin(this.citiesService.get(), this.amenitiesService.get()).subscribe(x => this.initFormStructure(x[0], x[1]));
    }
    initFormStructure(cities, amenities) {
        this.formStructure$ = of([
            new Control({
                controlType: 'dropdown',
                key: 'city',
                label: 'City:',
                placeholder: 'Choose the city',
                options: cities,
            }),
            new Control({
                controlType: 'checkbox',
                key: 'specials',
                options: [
                    { _id: "1", label: "25%" },
                    { _id: "2", label: "Recommend" },
                    { _id: "3", label: "Best price" }
                ],
            }),
            new Control({
                controlType: 'checkbox',
                key: 'amenities',
                label: 'Choose amenities:',
                options: amenities
            }),
        ]);
    }
    ngOnInit() {
    }
    onSubmit(formData) {
    }
    trackById(index, item) {
        return item.id;
    }
};
CatalogComponent = __decorate([
    Component({
        selector: 'app-catalog',
        templateUrl: './catalog.component.html',
        styleUrls: ['./catalog.component.scss'],
        providers: [CustomCurrencyPipe]
    })
], CatalogComponent);
export { CatalogComponent };
//# sourceMappingURL=catalog.component.js.map