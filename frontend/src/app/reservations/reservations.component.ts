import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../reservations.service';
import { Rezervacija } from '../models/rezervacija';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  neobradjeneRezervacije: Rezervacija[] = [];

  constructor(private reservationsService: ReservationsService) { }

  ngOnInit(): void {
    this.loadUnprocessedReservations();
  }

  loadUnprocessedReservations(): void {
    this.reservationsService.neobradjeneRezervacije().subscribe(
      (reservations: Rezervacija[]) => {
        this.neobradjeneRezervacije = reservations;
      },
      (error) => {
        console.error('Failed to load unprocessed reservations: ', error);
      }
    );
  }

  confirmReservation(reservation: Rezervacija): void {
    reservation.potvrdjenaRezervacija = true;
    this.reservationsService.potvrdiRezervaciju(reservation).subscribe(
      (updatedReservation: Rezervacija) => {
        console.log('Reservation confirmed successfully: ', updatedReservation);
        // Implement additional logic or data refresh on the frontend
      },
      (error) => {
        console.error('Failed to confirm reservation: ', error);
        // Handle the error and display appropriate message to the user
      }
    );
  }

  rejectReservation(reservation: Rezervacija): void {
    reservation.potvrdjenaRezervacija = false;
    reservation.razlogOdbijanja = 'Nedostatak slobodnih stolova'; // Example reason

    this.reservationsService.odbijRezervaciju(reservation).subscribe(
      (updatedReservation: Rezervacija) => {
        console.log('Reservation rejected successfully: ', updatedReservation);
        // Implement additional logic or data refresh on the frontend
      },
      (error) => {
        console.error('Failed to reject reservation: ', error);
        // Handle the error and display appropriate message to the user
      }
    );
  }

  
}
