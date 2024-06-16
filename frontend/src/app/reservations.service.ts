import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rezervacija } from './models/rezervacija';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private apiUrl = 'http://localhost:4000/rezervacije';

  constructor(private http: HttpClient) { }

  neobradjeneRezervacije() {
    return this.http.get<Rezervacija[]>(`${this.apiUrl}/neobradjeneRezervacije`);
  }

   // Metoda za potvrdu rezervacije
   potvrdiRezervaciju(reservation: Rezervacija) {
    return this.http.put<Rezervacija>(`${this.apiUrl}/potvrdiRezervaciju/${reservation.imeGosta}`, reservation);
  }

  // Metoda za odbijanje rezervacije
  odbijRezervaciju(reservation: Rezervacija) {
    return this.http.put<Rezervacija>(`${this.apiUrl}/odbijRezervaciju/${reservation.imeGosta}`, reservation);
  }
}
