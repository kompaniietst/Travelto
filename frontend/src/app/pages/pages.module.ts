import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
import { CoreModule } from '../core/core.module';
import { AboutComponent } from './about/about.component';


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
  AboutComponent
];

const MODULES = [
  BrowserModule,
  CommonModule,

  MatProgressSpinnerModule,
  SlickCarouselModule,

  RouterModule.forRoot(routes),
  SharedModule,
  PipesModule
]

@NgModule({
  declarations: [...COMPONENTS, CatalogComponent, AboutComponent,],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class PagesModule { }
