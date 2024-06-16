import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ProfilComponent } from './profil/profil.component';
import { ReservationsComponent } from './reservations/reservations.component';

const routes: Routes = [
  { path: "", component: PocetnaComponent },
  { path: "profil", component: ProfilComponent },
  { path: "rezervacije", component: ReservationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
