import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ProfilComponent } from './profil/profil.component';
import { RegisterComponent } from './registracija/registracija.component';
import { ReservationsComponent } from './reservations/reservations.component';

const routes: Routes = [
  { path: "", component: PocetnaComponent },
  { path: "profil", component: ProfilComponent },
  { path: "rezervacije", component: ReservationsComponent },
  { path: "registracija", component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
