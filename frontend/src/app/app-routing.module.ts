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
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ProfilGostComponent } from './profil-gost/profil-gost.component';
import { StatistikaComponent } from './statistika/statistika.component';
import { RestoraniGostComponent } from './restorani-gost/restorani-gost.component';
import { RestoranDetaljiComponent } from './restoran-detalji/restoran-detalji.component';
import { RezervacijeGostComponent } from './rezervacije-gost/rezervacije-gost.component';
import { KorpaComponent } from './korpa/korpa.component';
import { DostavaGostComponent } from './dostava-gost/dostava-gost.component';



const routes: Routes = [
  { path: "", component: PocetnaComponent },
  { path: "profil", component: ProfilComponent },
  { path: "profilGost", component: ProfilGostComponent },
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
  { path: "promenaLozinke", component: PromenaLozinkeComponent },
  { path: "adminLogin", component: AdminLoginComponent },
  { path: "statistika", component: StatistikaComponent },
  { path: "restoraniGost", component: RestoraniGostComponent },
  { path: "restoranDetalji/:ime", component: RestoranDetaljiComponent },
  { path: "rezervacijeGost", component: RezervacijeGostComponent },
  { path: 'korpa', component: KorpaComponent },
  { path: 'dostava', component: DostavaGostComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
