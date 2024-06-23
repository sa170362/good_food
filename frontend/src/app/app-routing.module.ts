import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorPocetnaComponent } from './administrator-pocetna/administrator-pocetna.component';
import { AdministratorZahteviComponent } from './administrator-zahtevi/administrator-zahtevi.component';
import { DodajKonobaraComponent } from './dodaj-konobara/dodaj-konobara.component';
import { DodajRestoranComponent } from './dodaj-restoran/dodaj-restoran.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ProfilComponent } from './profil/profil.component';
import { RegisterComponent } from './registracija/registracija.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { RestoranLayoutComponent } from './restoran-layout/restoran-layout.component';
import { PorudzbinaComponent } from './porudzbina/porudzbina.component';
import { LoginComponent } from './login/login.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';


const routes: Routes = [
  { path: "", component: PocetnaComponent },
  { path: "profil", component: ProfilComponent },
  { path: "rezervacije", component: ReservationsComponent },
  { path: "registracija", component: RegisterComponent },
  { path: "admin", component: AdministratorPocetnaComponent },
  { path: "requests", component: AdministratorZahteviComponent },
  { path: 'edit-user/:korisnickoIme', component: EditUserComponent },
  { path: 'dodajKonobara', component: DodajKonobaraComponent },
  { path: 'dodajRestoran', component: DodajRestoranComponent },
  { path: 'restoranMapa', component: RestoranLayoutComponent },
  { path: 'restoranMapa/:ime', component: RestoranLayoutComponent },
  { path: "porudzbine", component: PorudzbinaComponent },
  { path: "login", component: LoginComponent },
  { path: "rezervacija", component: ReservationFormComponent },
  { path: 'restorani', component: RestaurantListComponent },
  { path: 'restorani/detalji', component: RestaurantDetailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
