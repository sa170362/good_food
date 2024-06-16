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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PocetnaComponent,
    ProfilComponent,
    ReservationsComponent,
    RegisterComponent,
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
