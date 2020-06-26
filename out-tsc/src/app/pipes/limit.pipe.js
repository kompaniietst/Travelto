import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let LimitPipe = class LimitPipe {
    transform(items, limit) {
        return items.slice(0, limit);
    }
};
LimitPipe = __decorate([
    Pipe({
        name: 'limit'
    })
], LimitPipe);
export { LimitPipe };
//# sourceMappingURL=limit.pipe.js.map