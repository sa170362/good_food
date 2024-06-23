// src/app/restoran.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Restoran } from './models/restoran';

@Injectable({
  providedIn: 'root'
})
export class RestoranService {

  private apiUrl = 'http://localhost:4000/restorani'; // Adjust this URL based on your Express server URL

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/restorani`)
      .pipe(
        catchError((error: any) => {
          console.error('API Error', error);
          return throwError(error); // Return an observable error
        })
      );
  }
  getAllRestaurants() {
    return this.http.get<Restoran[]>(this.apiUrl);
  }
  addRestaurant(restaurant: Restoran) {
    return this.http.post<Restoran>(`${this.apiUrl}/add`, restaurant);
  }
  saveLayoutForRestoran(ime: string, layout: any) {
    return this.http.post(`${this.apiUrl}/${ime}/save-layout`, { layout });
  }

  createReservation(reservationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/rezervacije`, reservationData);
  }

  cancelReservation(reservationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/otkazi`, reservationData);
  }

  searchRestaurantsByName(name: string): Observable<Restoran> {
    return this.http.post<Restoran>(`${this.apiUrl}/ime`, { name })
      .pipe(
        catchError((error: any) => {
          console.error('API Error', error);
          return throwError(error); // Return an observable error
        })
      );
  }

}
