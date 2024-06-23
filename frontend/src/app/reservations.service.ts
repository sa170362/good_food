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
 
}
