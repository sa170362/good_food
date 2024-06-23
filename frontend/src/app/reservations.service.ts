import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rezervacija } from './models/rezervacija';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private apiUrl = 'http://localhost:4000/rezervacije';

  constructor(private http: HttpClient) { }

  getNeobradjeneRezervacije() {
    return this.http.get<Rezervacija[]>(`${this.apiUrl}/neobradjene`);
  }

  potvrdiRezervaciju(imeGosta: string, brojStola: number) {
    return this.http.post(`${this.apiUrl}/potvrdi/${encodeURIComponent(imeGosta)}`, { brojStola });
  }

  odbijRezervaciju(imeGosta: string, brojStola: number, razlogOdbijanja: string) {
    return this.http.post(`${this.apiUrl}/odbij/${encodeURIComponent(imeGosta)}`, { brojStola, razlogOdbijanja });
  }

  createReservation(reservationData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rezervacije`, reservationData);
  }
}
