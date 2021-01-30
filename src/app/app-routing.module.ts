import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroeComponent } from "./pages/heroe/heroe.component";
import { HeroesComponent } from "./pages/heroes/heroes.component";
import { HomeComponent } from './pages/home/home.component';
import { VillanoComponent } from './pages/villano/villano.component';
import { VillanosComponent } from './pages/villanos/villanos.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroe/:id', component: HeroeComponent },
  { path: 'villanos', component: VillanosComponent },
  { path: 'villano/:id', component: VillanoComponent },
  { path:'**', pathMatch: 'full', redirectTo:'home'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
