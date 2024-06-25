import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ProfilComponent } from './profil/profil.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { RegisterComponent } from './registracija/registracija.component';
import { AdministratorPocetnaComponent } from './administrator-pocetna/administrator-pocetna.component';
import { AdministratorZahteviComponent } from './administrator-zahtevi/administrator-zahtevi.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DodajKonobaraComponent } from './dodaj-konobara/dodaj-konobara.component';
import { DodajRestoranComponent } from './dodaj-restoran/dodaj-restoran.component';
import { RestoranLayoutComponent } from './restoran-layout/restoran-layout.component';
import { PorudzbinaComponent } from './porudzbina/porudzbina.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { ProfilGostComponent } from './profil-gost/profil-gost.component';
import { StatistikaComponent } from './statistika/statistika.component';
import { RestoraniGostComponent } from './restorani-gost/restorani-gost.component';
import { RestoranDetaljiComponent } from './restoran-detalji/restoran-detalji.component';
import { RezervacijeGostComponent } from './rezervacije-gost/rezervacije-gost.component';
import { KorpaComponent } from './korpa/korpa.component';
import { DostavaGostComponent } from './dostava-gost/dostava-gost.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PocetnaComponent,
    ProfilComponent,
    ReservationsComponent,
    RegisterComponent,
    AdministratorPocetnaComponent,
    AdministratorZahteviComponent,
    EditUserComponent,
    DodajKonobaraComponent,
    DodajRestoranComponent,
    RestoranLayoutComponent,
    PorudzbinaComponent,
    AdminLoginComponent,
    PromenaLozinkeComponent,
    ProfilGostComponent,
    StatistikaComponent,
    RestoraniGostComponent,
    RestoranDetaljiComponent,
    RezervacijeGostComponent,
    KorpaComponent,
    DostavaGostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
