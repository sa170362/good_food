import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Porudzbina } from './models/porudzbina';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaService {
  private apiUrl = 'http://localhost:4000/porudzbine';

  constructor(private http: HttpClient) {}

  getOrders(restoran: string) {
    return this.http.get<Porudzbina[]>(`${this.apiUrl}/${restoran}`, {});
  }
  getConfirmedOrders(restoran: string) {
    return this.http.get<Porudzbina[]>(`${this.apiUrl}/confirmed/${restoran}`,  {});
  }
  getRejectedOrders(restoran: string) {
    return this.http.get<Porudzbina[]>(`${this.apiUrl}/rejected/${restoran}`, {});
  }

  confirmOrder(customerKorIme: string, estimatedDeliveryTime: string): Observable<any> {
  
    return this.http.put<any>(`${this.apiUrl}/confirm/${customerKorIme}`, { estimatedDeliveryTime });
  }

  rejectOrder(customerKorIme: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reject/${customerKorIme}`, {});
  }
  createOrder(porudzbina: Porudzbina) {
    // console.log(porudzbina)
    return this.http.post<Porudzbina>(`${this.apiUrl}/kreiraj`, porudzbina);
  }
}
