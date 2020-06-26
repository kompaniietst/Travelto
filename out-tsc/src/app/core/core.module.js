import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReversePipe } from '../pipes/reverse.pipe';
// import { CustomCurrencyPipe } from '../pipes/customCurrency.pipe';
const routes = [];
const COMPONENTS = [
    HeaderComponent,
    ReversePipe,
];
const MODULES = [
    SharedModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
];
let CoreModule = class CoreModule {
};
CoreModule = __decorate([
    NgModule({
        declarations: [...COMPONENTS],
        imports: [...MODULES],
        exports: [...COMPONENTS]
    })
], CoreModule);
export { CoreModule };
//# sourceMappingURL=core.module.js.map