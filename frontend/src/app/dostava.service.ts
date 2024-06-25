import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Porudzbina } from './models/porudzbina';

@Injectable({
  providedIn: 'root'
})
export class DostavaService {

  private apiUrl = 'http://localhost:4000/dostava';

  constructor(private http: HttpClient) {}

  getAktuelneDostave(korisnik: string) {
    return this.http.get<Porudzbina[]>(`${this.apiUrl}/aktuelne/${korisnik}`);
  }
}
