import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeniService {

  private menuUrl = 'assets/menu.json'; // Putanja do vašeg JSON fajla

  constructor(private http: HttpClient) { }

  getMenu() {
    return this.http.get<any[]>(this.menuUrl)
  }
}
