import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rezervacija } from './models/rezervacija';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private apiUrl = 'http://localhost:4000/rezervacije';

  constructor(private http: HttpClient) { }

  getNeobradjeneRezervacije(restoran:string) {
    return this.http.get<Rezervacija[]>(`${this.apiUrl}/neobradjene/${encodeURIComponent(restoran)}`);
  }

  potvrdiRezervaciju(imeGosta: string, brojStola: number, korisnickoImeKonobara: string) {
    const url = `${this.apiUrl}/potvrdi/${encodeURIComponent(imeGosta)}/${encodeURIComponent(korisnickoImeKonobara)}`;
    return this.http.post(url, { brojStola });
  }

  odbijRezervaciju(imeGosta: string, brojStola: number, razlogOdbijanja: string) {
    return this.http.post(`${this.apiUrl}/odbij/${encodeURIComponent(imeGosta)}`, { brojStola, razlogOdbijanja });
  }
  getRez24h() {
    // alert("ovde")
    return this.http.get<Rezervacija[]>(`${this.apiUrl}/rezervacije24`);
  }
  getRez1m() {
    // alert("ovde")
    return this.http.get<Rezervacija[]>(`${this.apiUrl}/rezervacije1m`);
  }
  getAllReservations() {
    return this.http.get<Rezervacija[]>(`${this.apiUrl}/all`);
  }

  getRezervacijeR(restoran:string) {
    return this.http.get<Rezervacija[]>(`${this.apiUrl}/reservations/${encodeURIComponent(restoran)}`);
  }
  addReservation(rezervacija: Rezervacija) {
    return this.http.post<Rezervacija>(`${this.apiUrl}/create`, rezervacija);
  }

   // Metoda za dobijanje svih rezervacija gosta, sortiranih prema statusu (aktuelne ili istekle)
   getGuestReservations(korisnickoIme: string) {
    return this.http.get<Rezervacija[]>(`${this.apiUrl}/guest/${encodeURIComponent(korisnickoIme)}`);
  }

  // Metoda za otkazivanje rezervacije
  cancelReservation(imeGosta: string, datumVremeRezervacije: Date) {
    const url = `${this.apiUrl}/cancel/${encodeURIComponent(imeGosta)}`;
    return this.http.post(url, { datumVremeRezervacije });
  }
 
}
