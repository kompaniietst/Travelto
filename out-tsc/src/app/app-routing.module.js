import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
const routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'catalog', component: CatalogComponent },
    { path: 'about', component: AboutComponent },
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
            { path: 'amenities', component: AmenitiesComponent },
            { path: 'hotels', component: HotelsComponent },
            { path: 'rooms', component: RoomsComponent },
            { path: 'cities', component: CitiesComponent },
        ]
    },
    { path: 'hotel/:id', component: HotelComponent },
    { path: 'room/:id', component: RoomComponent },
    { path: '**', component: NotfoundComponent },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map