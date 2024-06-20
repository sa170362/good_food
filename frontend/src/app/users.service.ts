import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from './models/korisnik';
import { Message } from './models/message';

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
  prijavaNaSistemAdmin(korisnickoIme: string, lozinka: string) {
    const data = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
    };
    return this.http.post<Korisnik>(`${this.uri}/loginAdmin`, data);
  }
  register(user: Korisnik){
    // alert(user.profilnaSlika)
    return this.http.post<Message>(`${this.uri}/register`,
     user)
  }
  checkUsernameExists(username: string) {
    return this.http.get<boolean>(`${this.uri}/check-username/${username}`);
  }

  checkEmailExists(mejl: string) {
    return this.http.get<boolean>(`${this.uri}/check-email/${mejl}`);
  }
  getUsersByType(type: string) {
    return this.http.get<Korisnik[]>(`${this.uri}/type/${type}`);
  }
  deactivateUserGuest(korisnickoIme: string) {
    return this.http.put<Message>(`${this.uri}/deactivateUserGuest/${korisnickoIme}`, {});
  }
  deactivateUserKonobar(korisnickoIme: string) {
    return this.http.put<Message>(`${this.uri}/deactivateUserKonobar/${korisnickoIme}`, {});
  }
  getUsersPending() {
    return this.http.get<Korisnik[]>(`${this.uri}/users?type=gost&status=pending`);
  }
  getUsersBlocked() {
    return this.http.get<Korisnik[]>(`${this.uri}/blocked`);
  }
  activateUser(korisnickoIme: string) {
    return this.http.put<Message>(`${this.uri}/activateUser/${korisnickoIme}`, {});
  }
  rejectUser(korisnickoIme: string) {
    return this.http.put<Message>(`${this.uri}/rejectUser/${korisnickoIme}`, {});
  }
  updateUserByAdmin(korisnickoIme: string, updatedData: any){
    // alert("alo1")
    return this.http.put<Korisnik>(`${this.uri}/users/${korisnickoIme}`, updatedData);
  }
  getUserByUsername(korisnickoIme: string){
    return this.http.get<Korisnik>(`${this.uri}/users/${korisnickoIme}`);
  }
  registerKonobar(user: Korisnik){
    return this.http.post<Message>(`${this.uri}/registerKonobar`,
     user)
  }
  unblockUser(korisnickoIme: string) {
    return this.http.put<Message>(`${this.uri}/unblockUser/${korisnickoIme}`, {});
  }

  changePasswordWithOld(username: string, oldPassword: string, newPassword: string) {
    return this.http.put<any>(`${this.uri}/api/change-password-with-old`, { username, oldPassword, newPassword });
  }

  getSecurityQuestion(username: string) {
    return this.http.get<any>(`${this.uri}/api/security-question/${username}`);
  }

  answerSecurityQuestion(username: string, securityAnswer: string) {
    return this.http.put<any>(`${this.uri}/api/answer-security-question`, { username, securityAnswer });
  }

  changePasswordWithSecurityAnswer(username: string, newPassword: string) {
    return this.http.put<any>(`${this.uri}/api/change-password-with-security-answer`, { username, newPassword });
  }
}
