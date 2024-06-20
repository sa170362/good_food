import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  constructor(private servis: UsersService, private ruter: Router) { }

  ngOnInit(): void {
  }
  currentYear: number = new Date().getFullYear();
  kor_ime: string = "";
  lozinka: string = "";
  tip: string = "";
  poruka: string = "";

  prijavaNaSistem() {
    this.servis.prijavaNaSistemAdmin(this.kor_ime, this.lozinka).subscribe(
      (korisnik: Korisnik) => {
        if (!korisnik) {
          this.poruka = 'Pogrešno korisničko ime ili lozinka.';
        } else {
          if(korisnik.tip == 'admin')
          {localStorage.setItem('currentUser', JSON.stringify(korisnik));
          this.ruter.navigate(['admin']);}
          
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
    );
  }


}
