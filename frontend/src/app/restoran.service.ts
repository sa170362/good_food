// src/app/restoran.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
}
