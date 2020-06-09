import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './shared/header/header.component';
import { SharedModule } from '../shared/shared.module';

import { HttpClientModule } from '@angular/common/http';

const COMPONENTS = [
  HeaderComponent
];

const MODULES = [
  SharedModule,

  BrowserModule,
  CommonModule,
  HttpClientModule
];

@NgModule({
  declarations: [...COMPONENTS,],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class CoreModule { }
