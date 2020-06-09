import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';

import { NotfoundComponent } from './notfound/notfound.component';

const COMPONENTS = [
  HomeComponent,
  NotfoundComponent,
];

const MODULES = [
BrowserModule,
    CommonModule,
]

@NgModule({
  declarations: [...COMPONENTS,],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class PagesModule { }
