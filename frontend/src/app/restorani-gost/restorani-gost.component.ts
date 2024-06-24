import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { ReservationsService } from '../reservations.service';
import { RestoranService } from '../restoran.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-restorani-gost',
  templateUrl: './restorani-gost.component.html',
  styleUrls: ['./restorani-gost.component.css']
})
export class RestoraniGostComponent  implements OnInit{
  currentYear: number = new Date().getFullYear();
  restorani: any[] = [];
  totalRegisteredGuests: number = 0;
  sortByOptions = ['name', 'address', 'type'];
  filteredRestaurants: any[] = [];
  nazivQuery: string = '';
  adresaQuery: string = '';
  tipQuery: string = '';
  sortDirection: string = 'asc';
  sortByOption: string = '';
  sortColumn: string = '';
  brojRegistrovanihGostiju: number = 0;
  konobarTrenutni: Korisnik;
  brojRezervacijaPoslednjih24h: number = 0;
  brojRezervacijaPoslednjih7Dana: number = 0;
  brojRezervacijaPoslednjegMeseca: number = 0;
  rezervacije: any[] = [];

  constructor(private restoranService: RestoranService, private userService: UsersService, private reservationService: ReservationsService) {const storedUser = localStorage.getItem('selectedUser');
  this.konobarTrenutni = storedUser ? JSON.parse(storedUser) : null; }
  konobari: any = {};
  async ngOnInit(): Promise<void> {
    this.fetchRestaurants();
    this.fetchBrojRegistrovanihGostiju();
    await new Promise(f => setTimeout(f, 100));
    this.fetchKonobariForRestaurants()
    this.fetchRezervacije();
  }

  fetchRezervacije(): void {
    this.reservationService.getAllReservations().subscribe(
      async (data: any[]) => {
        this.rezervacije = data; 

         this.checkRezervacijePoslednjih24h()
         this.checkRezervacijePoslednjih7dana()
         this.checkRezervacijePoslednjihMesecDana()
      },
      (error) => {
        console.error('Greška pri dobijanju rezervacija', error);
      }
    );
  }
  encodeURIComponent(value: string): string {
    return encodeURIComponent(value);
  }
  checkRezervacijePoslednjih24h(): void {
    const danas = new Date();
    const pre24h = new Date(danas.getTime() - (24 * 60 * 60 * 1000));

    const rezervacijePoslednjih24h = this.rezervacije.filter(reservacija =>
      new Date(reservacija.datumKreiranja) >= pre24h && new Date(reservacija.datumKreiranja) <= danas
    );

    this.brojRezervacijaPoslednjih24h = rezervacijePoslednjih24h.length;
  }
  checkRezervacijePoslednjih7dana(): void {
    const danas = new Date();
    const pre7dana = new Date(danas.getTime() - (7 * 24 * 60 * 60 * 1000));

    const rezervacijePoslednjih7Dana = this.rezervacije.filter(reservacija =>
      new Date(reservacija.datumKreiranja) >= pre7dana && new Date(reservacija.datumKreiranja) <= danas
    );

    this.brojRezervacijaPoslednjih7Dana = rezervacijePoslednjih7Dana.length; 
  }
  checkRezervacijePoslednjihMesecDana(): void {
    const danas = new Date();
    const preMesecDana = new Date(danas.getTime() - (30 * 24 * 60 * 60 * 1000));

  
    const rezervacijePoslednjegMeseca = this.rezervacije.filter(reservacija =>
      new Date(reservacija.datumKreiranja) >= preMesecDana && new Date(reservacija.datumKreiranja) <= danas
    );

    this.brojRezervacijaPoslednjegMeseca = rezervacijePoslednjegMeseca.length;
  }

  fetchRestaurants() {
    this.restoranService.getRestaurants().subscribe(
      (data: any[]) => {
        this.restorani = data;
        this.filteredRestaurants = data; 
      },
      (error) => {
        console.error('Error fetching restaurants', error);
      }
    );
  }

  fetchKonobariForRestaurants() {

    this.restorani.forEach(restoran => {

      this.userService.getKonobari(restoran.ime).subscribe(
        (konobari: any) => {
          this.konobari[restoran.ime] = konobari; 
        },
        (error:any) => {
          console.error(`Error fetching waiters for restaurant ${restoran.ime}`, error);
        }
      );
    });

  }
  fetchBrojRegistrovanihGostiju() {
    this.userService.getBrojRegistrovanihGostiju().subscribe(
      (broj: number) => {
        this.brojRegistrovanihGostiju = broj;
      },
      (error) => {
        console.error('Error fetching number of registered guests', error);
      }
    );
  }
 
  sortBy(column: string): void {

    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
    
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredRestaurants.sort((a, b) => {
      const nameA = a[this.sortColumn].toLowerCase();
      const nameB = b[this.sortColumn].toLowerCase();
      if (this.sortDirection === 'asc') {
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
      } else {
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
      }
      return 0;
    });
  }

  search(): void {
    this.filteredRestaurants = this.restorani.filter(restoran =>
      (this.nazivQuery === '' || restoran.ime.toLowerCase().includes(this.nazivQuery.toLowerCase())) &&
      (this.adresaQuery === '' || restoran.adresa.toLowerCase().includes(this.adresaQuery.toLowerCase())) &&
      (this.tipQuery === '' || restoran.tip.toLowerCase().includes(this.tipQuery.toLowerCase()))
    );
  }

}
