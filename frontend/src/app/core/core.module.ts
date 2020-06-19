import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from './shared/header/header.component';
import { SharedModule } from '../shared/shared.module';

import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../pipes/pipes.module';

const routes: Routes = []

const COMPONENTS = [
  HeaderComponent,
];

const MODULES = [
  SharedModule,

  BrowserModule,
  CommonModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  PipesModule,

  RouterModule.forRoot(routes)
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class CoreModule { }
