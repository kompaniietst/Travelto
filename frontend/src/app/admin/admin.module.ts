import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MatTabsModule } from "@angular/material/tabs";

import { SharedModule } from '../shared/shared.module';

import { AdminComponent } from "./admin/admin.component";
import { HotelsComponent } from './hotels/hotels.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AddHotelComponent } from './hotels/add/add.component';
import { AddRoomComponent } from './rooms/add/add.component';

const routes: Routes = []

const COMPONENTS = [
  AdminComponent,
  HotelsComponent,
  AddHotelComponent,
  RoomsComponent,
  AddRoomComponent,
  AmenitiesComponent,

];

const MODULES = [

  BrowserModule,
  CommonModule,

  MatTabsModule,

  SharedModule,

  RouterModule.forRoot(routes),
  SharedModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class AdminModule { }
