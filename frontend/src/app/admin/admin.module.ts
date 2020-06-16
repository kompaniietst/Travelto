import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SharedModule } from '../shared/shared.module';

import { AdminComponent } from "./admin/admin.component";
import { HotelsComponent } from './hotels/hotels.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AddHotelComponent } from './hotels/add/add.component';
import { AddRoomComponent } from './rooms/add/add.component';
import { AddAmenitiesComponent } from './amenities/add/add.component';
import { ViewHotelsComponent } from './hotels/view/view.component';
import { HotelItemComponent } from './hotels/item/item.component';
import { ViewAmenitiesComponent } from './amenities/view/view.component';
import { CitiesComponent } from './cities/cities.component';
import { AddCitiesComponent } from './cities/add/add.component';
import { ViewCitiesComponent } from './cities/view/view.component';
import { ViewRoomsComponent } from './rooms/view/view.component';
import { RoomItemComponent } from './rooms/item/item.component';
import { StarRatingComponent } from '../shared/star-rating/star-rating.component';
import { CoreModule } from '../core/core.module';
import { AmenityItemComponent } from './amenities/item/item.component';

const routes: Routes = []

const COMPONENTS = [
  AdminComponent,

  HotelsComponent,
  AddHotelComponent,
  ViewHotelsComponent,
  HotelItemComponent,

  RoomsComponent,
  AddRoomComponent,
  ViewRoomsComponent,
  RoomItemComponent,

  AmenitiesComponent,
  AddAmenitiesComponent,
  ViewAmenitiesComponent,
  AmenityItemComponent,

  CitiesComponent,
  AddCitiesComponent,
  ViewCitiesComponent,


  // ReversePipe

];

const MODULES = [

  BrowserModule,
  CommonModule,

  MatTabsModule,
  MatProgressSpinnerModule,

  SharedModule,

  RouterModule.forRoot(routes),
  CoreModule,
];

@NgModule({
  declarations: [...COMPONENTS, AmenityItemComponent],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class AdminModule { }
