import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AccountComponent } from "./account/account.component";
import { HotelsComponent } from './hotels/hotels.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AddHotelComponent } from './hotels/add/add.component';
import { AddRoomComponent } from './rooms/add/add.component';
import { AddAmenitiesComponent } from './amenities/add/add.component';
import { HotelItemComponent } from './hotels/item/item.component';
import { ViewAmenitiesComponent } from './amenities/view/view.component';
import { CitiesComponent } from './cities/cities.component';
import { AddCitiesComponent } from './cities/add/add.component';
import { ViewCitiesComponent } from './cities/view/view.component';
import { RoomItemComponent } from './rooms/item/item.component';
import { AmenityItemComponent } from './amenities/item/item.component';
import { OrdersComponent } from './orders/orders.component';


import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { PipesModule } from '../pipes/pipes.module';
import { ActiveComponent } from './orders/active/active.component';
import { CompletedComponent } from './orders/completed/completed.component';
import { CanceledComponent } from './orders/canceled/canceled.component';

const routes: Routes = []

const COMPONENTS = [
  AccountComponent,

  OrdersComponent,

  HotelsComponent,
  AddHotelComponent,
  HotelItemComponent,

  RoomsComponent,
  AddRoomComponent,
  RoomItemComponent,

  AmenitiesComponent,
  AddAmenitiesComponent,
  ViewAmenitiesComponent,
  AmenityItemComponent,

  CitiesComponent,
  AddCitiesComponent,
  ViewCitiesComponent,

  ActiveComponent,
  CompletedComponent,
  CanceledComponent,

];

const MODULES = [

  BrowserModule,
  CommonModule,

  MatTabsModule,
  MatProgressSpinnerModule,

  SharedModule,

  RouterModule.forRoot(routes),
  CoreModule,
  PipesModule
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class AdminModule { }
