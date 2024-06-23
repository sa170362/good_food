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
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';


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
    RestaurantListComponent,
    RestaurantDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
