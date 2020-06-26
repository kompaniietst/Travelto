import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let StarRatingComponent = class StarRatingComponent {
    get starsAmount() {
        return Array.from(Array(5).keys());
    }
    ;
    trackById(index, item) {
        return item.id;
    }
};
__decorate([
    Input()
], StarRatingComponent.prototype, "starRating", void 0);
StarRatingComponent = __decorate([
    Component({
        selector: 'app-star-rating',
        templateUrl: './star-rating.component.html',
        styleUrls: ['./star-rating.component.scss']
    })
], StarRatingComponent);
export { StarRatingComponent };
//# sourceMappingURL=star-rating.component.js.map