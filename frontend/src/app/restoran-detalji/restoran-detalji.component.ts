import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JeloService } from '../jelo.service';
import { KorpaService } from '../korpa.service';
import { MeniService } from '../meni.service';
import { StavkaKorpe } from '../models/cartItem';
import { Jelo } from '../models/jelo';
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
  jela: Jelo[] = [];
  jelovnik: any[] = [];
  rezervacija: Rezervacija = new Rezervacija
  konfliktne: Rezervacija[] = []
  quantityMap: { [key: string]: number } = {};

  rezervacijaUspesna: boolean = false;
  rezervacijaNeuspesna: boolean = false;
  porukaOdbijanja: string = '';
  datumVremeValid: boolean = true;
  brojOsobaValid: boolean = true;

  constructor(private route: ActivatedRoute, private servis:RestoranService,
     private userServis:UsersService, private rezservis:ReservationsService, private mealService: JeloService, private korpaService: KorpaService,
     private meniService: MeniService, private ruter: Router) { 
    const storedUser = localStorage.getItem('selectedUser');
  this.gost = storedUser ? JSON.parse(storedUser) : null;
  }

  ngOnInit(): void {
    this.restoranIme = decodeURIComponent(this.route.snapshot.paramMap.get('ime')!);
    this.fetchRestoran();
    this.fetchRKonobari()
    this.loadMenu();
    this.mealService.getJela().subscribe((data: Jelo[]) => {
      this.jela = data;
    });
  }
  loadMenu(): void {
    this.meniService.getMenu()
      .subscribe(
        data => {
          this.jelovnik = data;
          // alert(this.jelovnik.length)
          this.jelovnik.forEach(jelo => {
            this.quantityMap[jelo.naziv] = 1;
          });
        },
        error => {
          console.error('Error loading menu:', error);
        }
      );
  }
  dodajUKorpu(jelo: Jelo): void {
    const kolicina = this.quantityMap[jelo.naziv];
    if (kolicina) {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const stavka: StavkaKorpe = {
        jelo: jelo,
        kolicina: kolicina
      };
      // Provera da li već postoji stavka u korpi sa istim jelom
    const existingIndex = cart.findIndex((item: any) => item.stavka.jelo === jelo);

    if (existingIndex !== -1) {
      // Ako već postoji, ažurirajemo samo količinu
      cart[existingIndex].stavka.kolicina += kolicina;
    } else {
      // Ako ne postoji, dodajemo novu stavku u korpu
      cart.push({
        restoran: this.restoranIme,
        stavka: stavka,
        korisnickoIme: this.gost.korisnickoIme
      });
    }
    localStorage.setItem('restoran', JSON.stringify(this.restoranIme));
      localStorage.setItem('cart', JSON.stringify(cart));

      // this.korpaService.dodajStavku(stavka);
      alert("Dodato u korpu!");
    }
  }

   prikaziKorpu(): void {
    this.ruter.navigate(['/korpa']); // Preusmeri na /korpa
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
    // alert(this.rezervacija.datumVremeRezervacije)
    // // Validacija forme
    // this.validateForm();

    // if (this.datumVremeValid && this.brojOsobaValid) {
    //   this.rezervacija.brojStola=undefined;
    //   this.rezervacija.statusRezervacije='neobradjena';
    //   this.rezervacija.imeGosta= this.gost.ime + this.gost.prezime;
    //   this.rezervacija.korisnickoIme = this.gost.korisnickoIme;
    //   this.rezervacija.datumKreiranja = new Date();
    //   this.rezervacija.restoran= this.restoranIme
    //   // this.rezervacija.datumKreiranja = new Date().toISOString();
    //   this.rezservis.addReservation(this.rezervacija).subscribe(
    //     () => {
    //       this.rezervacijaUspesna = true;
    //     this.rezervacijaNeuspesna = false;
    //     this.porukaOdbijanja = '';

    //     // Resetovanje forme nakon uspešne rezervacije
    //     this.rezervacija = new Rezervacija();
    //     alert("Uspesno ste rezervisali sto!")
    //     }
    //   );
    //   } else {
    //     this.rezervacijaUspesna = false;
    //     this.rezervacijaNeuspesna = true;
    //     alert('Nažalost, rezervacija nije moguća u zadatom terminu ili za izabrani broj osoba.')
    //     // this.porukaOdbijanja = 'Nažalost, rezervacija nije moguća u zadatom terminu ili za izabrani broj osoba.';
    //   }
    this.izvadiKonfliktneRezervacije();
    alert(this.konfliktne.length)







    }
  

  validateForm(): void {
    this.brojOsobaValid = this.rezervacija.brojGostiju !== null && this.rezervacija.brojGostiju! >= 1;
  }

  incrementQuantity(jelo: Jelo): void {
    this.quantityMap[jelo.naziv]++;
  }

  decrementQuantity(jelo: Jelo): void {
    if (this.quantityMap[jelo.naziv] > 1) {
      this.quantityMap[jelo.naziv]--;
    }
  }

  izvadiKonfliktneRezervacije():void{
    const datumVremeRezervacijeDate = new Date(this.rezervacija.datumVremeRezervacije);

    // Call service method with Date object
    this.rezservis.searchReservations(this.restoranIme, datumVremeRezervacijeDate).subscribe(
      async (data: any) => {
        this.konfliktne = data; 
      },
      (error) => {
        console.error('Greška pri dobijanju rezervacija', error);
      }
    );
  }
}
