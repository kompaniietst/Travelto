import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from "@angular/material/tabs";
import { MatRadioModule } from '@angular/material/radio';

import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './account/profile.component';
import { FavoriteComponent } from './account/favorite/favorite.component';

import { SharedModule } from '../shared/shared.module';
import { PersonalComponent } from './account/personal/personal.component';
import { HotelComponent } from './hotel/hotel.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RoomComponent } from './room/room.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AboutComponent } from './about/about.component';
import { AddYourHotelComponent } from './add-hotel/add-hotel.component';
import { FilterFormComponent } from './catalog/filter-form/filter-form.component';
import { FilteredRoomsComponent } from './catalog/filtered-rooms/filtered-rooms.component';

const routes: Routes = []

const COMPONENTS = [
  HomeComponent,
  NotfoundComponent,
  ProfileComponent,
  PersonalComponent,
  FavoriteComponent,
  HotelComponent,
  RoomComponent,
  CatalogComponent,
  AboutComponent,
  AddYourHotelComponent,
  // MemberOrdersComponent,
  // UsersOrdersComponent,
  // MemberOrderItemComponent,
  // UserOrderItemComponent,
  FilteredRoomsComponent,
  FilterFormComponent
];

const MODULES = [
  BrowserModule,
  CommonModule,

  MatProgressSpinnerModule,
  MatTabsModule,
  MatRadioModule,
  SlickCarouselModule,

  RouterModule.forRoot(routes),
  SharedModule,
  PipesModule
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class PagesModule { }
