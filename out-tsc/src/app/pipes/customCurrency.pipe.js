import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let CustomCurrencyPipe = class CustomCurrencyPipe {
    transform(value) {
        return value.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
};
CustomCurrencyPipe = __decorate([
    Pipe({
        name: 'customCurrency'
    })
], CustomCurrencyPipe);
export { CustomCurrencyPipe };
//# sourceMappingURL=customCurrency.pipe.js.map