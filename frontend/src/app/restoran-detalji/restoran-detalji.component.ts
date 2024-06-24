import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Restoran } from '../models/restoran';
import { Rezervacija } from '../models/rezervacija';
import { ReservationsService } from '../reservations.service';
import { RestoranService } from '../restoran.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-restoran-detalji',
  templateUrl: './restoran-detalji.component.html',
  styleUrls: ['./restoran-detalji.component.css']
})
export class RestoranDetaljiComponent implements OnInit{
  restoranIme: string = '';
  currentYear: number = new Date().getFullYear();
  restoran:Restoran = new Restoran;
  konobari:Korisnik[]=[]
gost:Korisnik
  rezervacija: Rezervacija = new Rezervacija

  rezervacijaUspesna: boolean = false;
  rezervacijaNeuspesna: boolean = false;
  porukaOdbijanja: string = '';
  datumVremeValid: boolean = true;
  brojOsobaValid: boolean = true;

  constructor(private route: ActivatedRoute, private servis:RestoranService, private userServis:UsersService, private rezservis:ReservationsService) { 
    const storedUser = localStorage.getItem('selectedUser');
  this.gost = storedUser ? JSON.parse(storedUser) : null;
  }

  ngOnInit(): void {
    this.restoranIme = decodeURIComponent(this.route.snapshot.paramMap.get('ime')!);
    this.fetchRestoran();
    this.fetchRKonobari()
  }

  fetchRestoran(): void{
    this.servis.fetchRestoran(this.restoranIme).subscribe(
      async (data: any) => {
        this.restoran = data; 

        
      },
      (error) => {
        console.error('Greška pri dobijanju restorana', error);
      }
    );
  }
  fetchRKonobari(): void{
    this.userServis.getKonobari(this.restoranIme).subscribe(
      async (data: any) => {
        this.konobari = data; 

        
      },
      (error) => {
        console.error('Greška pri dobijanju konobara', error);
      }
    );
  }

  submitReservation(): void {
    alert(this.rezervacija.datumVremeRezervacije)
    // Validacija forme
    this.validateForm();

    if (this.datumVremeValid && this.brojOsobaValid) {
      this.rezervacija.brojStola=undefined;
      this.rezervacija.statusRezervacije='neobradjena';
      this.rezervacija.imeGosta= this.gost.ime + this.gost.prezime;
      this.rezervacija.korisnickoIme = this.gost.korisnickoIme;
      this.rezervacija.datumKreiranja = new Date();
      this.rezervacija.restoran= this.restoranIme
      // this.rezervacija.datumKreiranja = new Date().toISOString();
      this.rezservis.addReservation(this.rezervacija).subscribe(
        () => {
          this.rezervacijaUspesna = true;
        this.rezervacijaNeuspesna = false;
        this.porukaOdbijanja = '';

        // Resetovanje forme nakon uspešne rezervacije
        this.rezervacija = new Rezervacija();
        alert("Uspesno ste rezervisali sto!")
        }
      );
      } else {
        this.rezervacijaUspesna = false;
        this.rezervacijaNeuspesna = true;
        alert('Nažalost, rezervacija nije moguća u zadatom terminu ili za izabrani broj osoba.')
        // this.porukaOdbijanja = 'Nažalost, rezervacija nije moguća u zadatom terminu ili za izabrani broj osoba.';
      }
    }
  

  validateForm(): void {
    // Validacija datuma i vremena
    // this.datumVreme = this.rezervacija.datumVremeRezervacije !== '';

    // Validacija broja osoba (minimalni broj osoba može biti 1)
    this.brojOsobaValid = this.rezervacija.brojGostiju !== null && this.rezervacija.brojGostiju! >= 1;
  }
}
