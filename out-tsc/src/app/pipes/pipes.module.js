import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LimitPipe } from './limit.pipe';
import { CustomCurrencyPipe } from './customCurrency.pipe';
const COMPONENTS = [
    LimitPipe,
    CustomCurrencyPipe
];
const MODULES = [
    BrowserModule,
    CommonModule,
];
let PipesModule = class PipesModule {
};
PipesModule = __decorate([
    NgModule({
        declarations: [...COMPONENTS],
        imports: [...MODULES],
        exports: [...COMPONENTS]
    })
], PipesModule);
export { PipesModule };
//# sourceMappingURL=pipes.module.js.map