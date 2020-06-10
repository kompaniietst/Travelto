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


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'profile/:id', component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'personal', pathMatch: 'full' },
      { path: 'personal', component: PersonalComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'favorite', component: FavoriteComponent }
    ]
  },
  { path: 'personal', component: PersonalComponent },

  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'hotels', pathMatch: 'full' },
      {
        path: 'amenities', component: AmenitiesComponent,
        // resolve: { amenities: AmenitiesResolver }
      },
      {
        path: 'hotels', component: HotelsComponent,
        // resolve: { amenities: AmenitiesResolver }
      },
      {
        path: 'rooms', component: RoomsComponent,
        //   resolve: {
        //     amenities: AmenitiesResolver,
        //     hotels: HotelsResolver,
        //   }
      },
    ]
  },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
