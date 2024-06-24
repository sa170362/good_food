import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Rezervacija } from '../models/rezervacija';
import { ReservationsService } from '../reservations.service';
import { RestoranService } from '../restoran.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-rezervacije-gost',
  templateUrl: './rezervacije-gost.component.html',
  styleUrls: ['./rezervacije-gost.component.css']
})
export class RezervacijeGostComponent implements OnInit{

gost:Korisnik
  constructor(private restoranService: RestoranService, private userService: UsersService, private reservationService: ReservationsService) {
    const storedUser = localStorage.getItem('selectedUser');
  this.gost = storedUser ? JSON.parse(storedUser) : null; }

  aktuelneRezervacije: Rezervacija[] = [];
  istekleRezervacije: Rezervacija[] = [];



  ngOnInit(): void {
  
    this.loadGuestReservations()
  }

  loadGuestReservations() {
    const korisnickoIme = this.gost.korisnickoIme; // Podesiti korisničko ime gosta

    this.reservationService.getGuestReservations(korisnickoIme).subscribe(
      (rezervacije) => {
        // alert(rezervacije.length)
        const now = new Date();

        this.aktuelneRezervacije = rezervacije.filter(rez => {
          const rezStartTime = new Date(rez.datumVremeRezervacije); // Vreme početka rezervacije
          const rezEndTime = new Date(rezStartTime.getTime() + 3 * 60 * 60 * 1000); // Vreme završetka rezervacije (3 sata kasnije)
  
          return rezEndTime > now; // Rezer
        });
        this.istekleRezervacije = rezervacije.filter(rez => {
          const rezStartTime = new Date(rez.datumVremeRezervacije); // Vreme početka rezervacije
          const rezEndTime = new Date(rezStartTime.getTime() + 3 * 60 * 60 * 1000); // Vreme završetka rezervacije (3 sata kasnije)
  
          return rezEndTime <= now; // Rezervacija je istekla ako je vreme završetka manje ili jednako trenutnom vremenu
        });
      },
      (error) => {
        console.error('Error loading guest reservations:', error);
      }
    );
  }

  cancelReservation(imeGosta: string, datumVremeRezervacije: Date) {
    this.reservationService.cancelReservation(imeGosta, datumVremeRezervacije).subscribe(
      () => {
        console.log('Reservation canceled successfully.');
        // Ponovno učitaj rezervacije nakon otkazivanja
        this.loadGuestReservations();
      },
      (error) => {
        console.error('Error canceling reservation:', error);
      }
    );
  }



}
