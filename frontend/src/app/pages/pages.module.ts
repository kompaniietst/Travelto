import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './profile/orders/orders.component';
import { FavoriteComponent } from './profile/favorite/favorite.component';

import { SharedModule } from '../shared/shared.module';
import { PersonalComponent } from './profile/personal/personal.component';
import { HotelComponent } from './hotel/hotel.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';


const routes: Routes = []

const COMPONENTS = [
  HomeComponent,
  NotfoundComponent,
  ProfileComponent,
  PersonalComponent,
  OrdersComponent,
  FavoriteComponent,
  HotelComponent,

];

const MODULES = [
  BrowserModule,
  CommonModule,

  MatProgressSpinnerModule,
  SlickCarouselModule,

  RouterModule.forRoot(routes),
  SharedModule,
]

@NgModule({
  declarations: [...COMPONENTS,],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class PagesModule { }
