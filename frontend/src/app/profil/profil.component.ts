import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {

  korisnik: Korisnik = {
    korisnickoIme: 'petarp',
    lozinka: 'petar456',
    sigurnosnoPitanje: 'Koji je bio vaš prvi automobil?',
    sigurnosniOdgovor: 'Volkswagen Golf',
    ime: 'Petar',
    prezime: 'Petrović',
    pol: 'muški',
    adresa: 'Prvomajska 20',
    kontaktTelefon: '433434393493',
    mejl: 'petar@gmail.com"',
    profilnaSlika: undefined,
    profilnaSlikaUrl: 'https://example.com/profile-pic-petar.jpg',
    brojKreditneKartice: '4567-8901-2345-6789',
    tip:'konobar'
  };

  profilnaSlika: File | undefined;
  currentYear: number = new Date().getFullYear();
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfil(this.korisnik.korisnickoIme).subscribe(
      (response: Korisnik) => {
        console.log(response);
        this.korisnik = response;
      },
      (error) => {
        console.error('Failed to load user profile: ', error);
      }
    );
  }

  updateProfile(): void {
    this.userService.azurirajProfil(this.korisnik).subscribe(
      (response: Korisnik) => {
        console.log('Profile updated successfully: ', response);
      }
    );
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.profilnaSlika = file;
  }

  uploadProfilePicture(): void {
    if (this.profilnaSlika) {
      // Implementirati logiku za proveru veličine slike ovde ako je potrebno
      // Implementirati logiku za proveru formata slike ovde ako je potrebno

      this.userService.uploadProfilePicture(this.profilnaSlika).subscribe(
        (response: any) => {
          console.log('Profile picture uploaded successfully: ', response);
          this.korisnik.profilnaSlikaUrl = response.url; // Ovo bi trebalo da bude URL do slike koju vraća server
          this.updateProfile(); // Ažurirajte profil sa novom putanjom slike
        },
        (error) => {
          console.error('Failed to upload profile picture: ', error);
        }
      );
    } else {
      console.warn('No profile picture selected.');
      // Ovde možete postaviti podrazumevanu sliku ako korisnik nije izabrao sliku
    }
  }

}
