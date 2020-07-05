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
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './profile/orders/orders.component';
import { FavoriteComponent } from './profile/favorite/favorite.component';

import { SharedModule } from '../shared/shared.module';
import { PersonalComponent } from './profile/personal/personal.component';
import { HotelComponent } from './hotel/hotel.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RoomComponent } from './room/room.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AboutComponent } from './about/about.component';
import { AddYourHotelComponent } from './add-hotel/add-hotel.component';
import { MemberOrdersComponent } from './profile/orders/member-orders/member-orders.component';
import { UsersOrdersComponent } from './profile/orders/users-orders/users-orders.component';
import { MemberOrderItemComponent } from './profile/orders/member-orders/item/item.component';
import { UserOrderItemComponent } from './profile/orders/users-orders/item/item.component';
import { FilterFormComponent } from './catalog/filter-form/filter-form.component';
import { FilteredRoomsComponent } from './catalog/filtered-rooms/filtered-rooms.component';

const routes: Routes = []

const COMPONENTS = [
  HomeComponent,
  NotfoundComponent,
  ProfileComponent,
  PersonalComponent,
  OrdersComponent,
  FavoriteComponent,
  HotelComponent,
  RoomComponent,
  CatalogComponent,
  AboutComponent,
  AddYourHotelComponent,
  MemberOrdersComponent,
  UsersOrdersComponent,
  MemberOrderItemComponent,
  UserOrderItemComponent,
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
