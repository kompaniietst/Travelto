import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from './shared/header/header.component';
import { SharedModule } from '../shared/shared.module';

import { HttpClientModule } from '@angular/common/http';
import { ReversePipe } from '../pipes/reverse.pipe';
import { CustomCurrencyPipe } from '../pipes/customCurrency.pipe';

const routes: Routes = []

const COMPONENTS = [
  HeaderComponent,
  ReversePipe,
  CustomCurrencyPipe,
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

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class CoreModule { }
