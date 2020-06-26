import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let ReversePipe = class ReversePipe {
    transform(array) {
        var _a;
        return (_a = array) === null || _a === void 0 ? void 0 : _a.slice().reverse();
    }
};
ReversePipe = __decorate([
    Pipe({
        name: 'reverse'
    })
], ReversePipe);
export { ReversePipe };
//# sourceMappingURL=reverse.pipe.js.map