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

  getOrders() {
    return this.http.get<Porudzbina[]>(this.apiUrl);
  }

  confirmOrder(customer: string, estimatedDeliveryTime: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/confirm/${customer}`, { estimatedDeliveryTime });
  }

  rejectOrder(customer: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reject/${customer}`, {});
  }
}
