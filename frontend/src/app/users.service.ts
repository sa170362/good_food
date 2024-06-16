import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from './models/korisnik';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  uri = 'http://localhost:4000/users';

  constructor(private http: HttpClient) {}

  getUserProfil(korisnickoIme: string) {
    return this.http.get<Korisnik>(`${this.uri}/profile`, { params: { korisnickoIme: korisnickoIme } });
  }

  azurirajProfil(updatedUser: Korisnik) {
    return this.http.put<any>(`${this.uri}/profile`, updatedUser);
  }

  uploadProfilePicture(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<any>(`${this.uri}/profile-picture`, formData);
  }

  prijavaNaSistem(korisnickoIme: string, lozinka: string) {
    const data = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
    };
    return this.http.post<Korisnik>(`${this.uri}/login`, data);
  }
}
