import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { PersonalComponent } from './pages/account/personal/personal.component';
import { FavoriteComponent } from './pages/account/favorite/favorite.component';

import { HotelComponent } from './pages/hotel/hotel.component';
import { RoomComponent } from './pages/room/room.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AddYourHotelComponent } from './pages/add-hotel/add-hotel.component';
import { RoleGuard } from './core/guards/role.guard';
import { AmenitiesComponent } from './dashboard/amenities/amenities.component';
import { HotelsComponent } from './dashboard/hotels/hotels.component';
import { RoomsComponent } from './dashboard/rooms/rooms.component';
import { CitiesComponent } from './dashboard/cities/cities.component';
import { AccountComponent } from './dashboard/account/account.component';
import { OrdersComponent } from './dashboard/orders/orders.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'account/:id', component: AccountComponent,
    children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full' },
      { path: 'personal', component: PersonalComponent },
      {
        path: 'orders', component: OrdersComponent,
        canActivate: [RoleGuard], data: { expectedRole: ['admin', 'member', 'user'] }
      },
      // { path: 'favorite', component: FavoriteComponent },

      {
        path: 'amenities', component: AmenitiesComponent,
        canActivate: [RoleGuard], data: { expectedRole: ['admin'] }
      },
      {
        path: 'hotels', component: HotelsComponent,
        canActivate: [RoleGuard], data: { expectedRole: ['admin', 'member'] }
      },
      {
        path: 'rooms', component: RoomsComponent,
        canActivate: [RoleGuard], data: { expectedRole: ['admin', 'member'] }
      },
      {
        path: 'cities', component: CitiesComponent,
        canActivate: [RoleGuard], data: { expectedRole: ['admin'] }
      },


    ]
  },
  // { path: 'personal', component: PersonalComponent },
  { path: 'add-hotel', component: AddYourHotelComponent },
  // {
  //   path: 'admin', component: AdminComponent,
  //   children: [
  //     { path: '', redirectTo: 'hotels', pathMatch: 'full' },
  //     { path: 'amenities', component: AmenitiesComponent, canActivate: [AuthGuard] },
  //     { path: 'hotels', component: HotelsComponent, canActivate: [AuthGuard] },
  //     { path: 'rooms', component: RoomsComponent, canActivate: [AuthGuard] },
  //     { path: 'cities', component: CitiesComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },
  //   ]
  // },

  { path: 'hotel/:id', component: HotelComponent },
  { path: 'room/:id', component: RoomComponent },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
