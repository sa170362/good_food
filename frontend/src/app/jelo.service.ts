import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jelo } from './models/jelo';

@Injectable({
  providedIn: 'root'
})
export class JeloService {
  private apiUrl = 'http://localhost:4000/jela';

  constructor(private http: HttpClient) {}

  getJela() {
    return this.http.get<Jelo[]>(this.apiUrl);
  }

  addJelo(jelo: Jelo) {
    return this.http.post<Jelo>(this.apiUrl, jelo);
  }
}
