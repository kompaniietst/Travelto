import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { LimitPipe } from 'src/app/pipes/limit.pipe';
let CardComponent = class CardComponent {
    constructor(hotelService) {
        this.hotelService = hotelService;
        this.limit = -1;
        this.carouselConfigRooms = {
            speed: 700,
            slidesToShow: 1,
            slidesToScroll: 1,
            cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
            needLink: true,
            arrows: true,
            autoplay: true,
            draggable: true,
        };
        this.thumbnailsConfig = {
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            cssEase: 'linear',
            autoplay: true,
            arrows: false,
            draggable: true,
            focusOnSelect: true,
        };
    }
    ngOnInit() {
        this.hotelService.gethotelInfoByRoom(this.room.hotel_id)
            .subscribe((x) => {
            this.hotel = x;
            var hotelImages = x.images.slice(0, x.images.length - 1);
            this.slides = [...hotelImages, ...this.room.images];
        });
    }
    showMore() { }
    trackById(index, item) {
        return item.id;
    }
};
__decorate([
    Input()
], CardComponent.prototype, "room", void 0);
__decorate([
    Input()
], CardComponent.prototype, "hotel", void 0);
__decorate([
    Input()
], CardComponent.prototype, "limit", void 0);
CardComponent = __decorate([
    Component({
        selector: 'app-card',
        templateUrl: './card.component.html',
        styleUrls: ['./card.component.scss'],
        providers: [LimitPipe]
    })
], CardComponent);
export { CardComponent };
//# sourceMappingURL=card.component.js.map