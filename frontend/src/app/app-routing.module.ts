import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PersonalComponent } from './pages/profile/personal/personal.component';
import { OrdersComponent } from './pages/profile/orders/orders.component';
import { FavoriteComponent } from './pages/profile/favorite/favorite.component';


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

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
