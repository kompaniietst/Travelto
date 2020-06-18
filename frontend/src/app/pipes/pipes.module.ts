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

]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})

export class PipesModule { }
