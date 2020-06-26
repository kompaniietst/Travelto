import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let CarouselComponent = class CarouselComponent {
    // this.carouselConfig["asNavFor"] = ".carousel.thumbnail" + this.room.id;
    // this.thumbnailsConfig["asNavFor"] = ".carousel.img" + this.room.id;
    constructor() {
        this.defaultConfig = {
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        this.currentSlide = 1;
        this.config = this.defaultConfig;
    }
    slickInit(e) { }
    breakpoint(e) { }
    afterChange(e) {
        this.currentSlide = e.currentSlide + 1;
    }
    beforeChange(e) { }
    countSlides() {
        return this.needCountSlides ? this.slides.length : 0;
    }
    ngOnInit() {
        if (this.thumbnailsConfig && this.id) {
            this.config["asNavFor"] = ".carousel.thumbnail" + this.id;
            this.thumbnailsConfig["asNavFor"] = ".carousel.img" + this.id;
        }
    }
    trackById(index, item) {
        return item.id;
    }
};
__decorate([
    Input()
], CarouselComponent.prototype, "id", void 0);
__decorate([
    Input()
], CarouselComponent.prototype, "slides", void 0);
__decorate([
    Input()
], CarouselComponent.prototype, "config", void 0);
__decorate([
    Input()
], CarouselComponent.prototype, "needCountSlides", void 0);
__decorate([
    Input()
], CarouselComponent.prototype, "thumbnailsConfig", void 0);
CarouselComponent = __decorate([
    Component({
        selector: 'app-carousel',
        templateUrl: './carousel.component.html',
        styleUrls: ['./carousel.component.scss']
    })
], CarouselComponent);
export { CarouselComponent };
//# sourceMappingURL=carousel.component.js.map