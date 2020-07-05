import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PersonalComponent } from './pages/profile/personal/personal.component';
import { OrdersComponent } from './pages/profile/orders/orders.component';
import { FavoriteComponent } from './pages/profile/favorite/favorite.component';
import { AdminComponent } from './admin/admin/admin.component';
import { HotelsComponent } from './admin/hotels/hotels.component';
import { RoomsComponent } from './admin/rooms/rooms.component';
import { AmenitiesComponent } from './admin/amenities/amenities.component';
import { CitiesComponent } from './admin/cities/cities.component';
import { HotelComponent } from './pages/hotel/hotel.component';
import { RoomComponent } from './pages/room/room.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AddHotelComponent } from './admin/hotels/add/add.component';
import { AddYourHotelComponent } from './pages/add-hotel/add-hotel.component';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'profile/:id', component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full' },
      { path: 'personal', component: PersonalComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'favorite', component: FavoriteComponent }
    ]
  },
  { path: 'personal', component: PersonalComponent },
  { path: 'add-hotel', component: AddYourHotelComponent },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'hotels', pathMatch: 'full' },
      { path: 'amenities', component: AmenitiesComponent, canActivate: [AuthGuard] },
      { path: 'hotels', component: HotelsComponent, canActivate: [AuthGuard] },
      { path: 'rooms', component: RoomsComponent, canActivate: [AuthGuard] },
      { path: 'cities', component: CitiesComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },
    ]
  },

  { path: 'hotel/:id', component: HotelComponent },
  { path: 'room/:id', component: RoomComponent },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
