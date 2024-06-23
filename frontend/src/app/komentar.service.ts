import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Komentar } from './models/komentar';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KomentarService {

  private baseUrl = 'http://localhost:4000/komentari'; // Promeniti na odgovarajući API endpoint

  constructor(private http: HttpClient) { }

  getAllKomentari(): Observable<Komentar[]> {
    return this.http.get<Komentar[]>(this.baseUrl);
  }

  getKomentariByImeRestorana(imeRestorana: string): Observable<Komentar[]> {
    const url = `${this.baseUrl}/${encodeURIComponent(imeRestorana)}`;
    return this.http.get<Komentar[]>(url).pipe(
      catchError(error => {
        console.error('Error fetching comments:', error);
        return throwError(error);
      })
    );
  }

}
