import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { LimitPipe } from './limit.pipe';
import { CustomCurrencyPipe } from './customCurrency.pipe';
import { ReversePipe } from './reverse.pipe';
import { FilterPipe } from './filter.pipe';


const COMPONENTS = [
  LimitPipe,
  CustomCurrencyPipe,
  ReversePipe,
  FilterPipe
];

const MODULES = [
  BrowserModule,
  CommonModule,

]

@NgModule({
  declarations: [...COMPONENTS, FilterPipe],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})

export class PipesModule { }
