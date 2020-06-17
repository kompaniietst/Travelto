import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { LimitPipe } from './limit.pipe';
import { CurrencyPipe } from './currency.pipe';
import { CustomCurrencyPipe } from './customCurrency.pipe';


const COMPONENTS = [
  LimitPipe,
  CustomCurrencyPipe
  // CurrencyPipe
];

const MODULES = [
  BrowserModule,
  CommonModule,

]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})

export class PipesModule { }
