import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private servis: UsersService, private ruter: Router) { }

  ngOnInit(): void {
  }
  currentYear: number = new Date().getFullYear();
  kor_ime: string = "";
  lozinka: string = "";
  tip: string = "";
  poruka: string = "";

  // prijavaNaSistem() {
  //   this.servis.prijavaNaSistem(this.kor_ime, this.lozinka).subscribe(
  //     (korisnik: Korisnik) => {
  //       if (!korisnik) {
  //         this.poruka = 'Pogrešno korisničko ime ili lozinka.';
  //       } else {
  //         if(korisnik.tip == 'konobar')
  //         {localStorage.setItem('currentUser', JSON.stringify(korisnik));
  //         this.ruter.navigate(['profil']);}
  //         else{
  //           if(korisnik.tip == 'gost')
  //           {localStorage.setItem('currentUser', JSON.stringify(korisnik));
  //           this.ruter.navigate(['profil']);}
  //         }
  //       }
  //     },
  //     (error) => {
  //       console.error('Greška pri prijavi:', error);
  //       if (error.error && error.error.message) {
  //         this.poruka = error.error.message;
  //       } else {
  //         this.poruka = 'Greška pri prijavi korisnika. Proverite svoje kredencijale.';
  //       }
  //     }
  //   );
  // }
  prijavaNaSistem() {
    this.servis.prijavaNaSistem(this.kor_ime, this.lozinka).subscribe(
      (response: any) => {
        if (response.status === 'not_found' || response.status === 'incorrect_credentials') {
          this.poruka = 'Pogrešna lozinka.';
        } else if (response.status === 'pending') {
          this.poruka = 'Korisnik čeka odobrenje administratora.';
        } else if (response.status === 'blocked') {
          this.poruka = 'Nalog je blokiran.';
        } else if (response.status === 'inactive') {
          this.poruka = 'Vaš nalog više nije aktivan.';
        } else if (response.status === 'success') {
          localStorage.setItem('selectedUser', JSON.stringify(response.user));
          if(response.user.tip == 'gost'){this.ruter.navigate(['profilGost']);}
          
          else{this.ruter.navigate(['profil']);}
         
        }
      },
      (error) => {
        console.error('Greška pri prijavi:', error);
        if (error.error && error.error.message) {
          this.poruka = error.error.message;
        } else {
          this.poruka = 'Greška pri prijavi korisnika. Proverite svoje kredencijale.';
        }
      }
    );}
}
