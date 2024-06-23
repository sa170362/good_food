import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestoranService } from '../restoran.service';
import { Restoran } from '../models/restoran';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit{
  reservationForm!: FormGroup; // Inicijalizacija FormGroup
  restaurant: Restoran | undefined;
  @Output() submitReservation: EventEmitter<void> = new EventEmitter<void>(); // Emitovanje događaja

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestoranService,
    private fb: FormBuilder, private reservationService: ReservationsService
  ) { }

  ngOnInit(): void {
    this.createForm();
    const name = localStorage.getItem('selectedRestaurantName');
    console.error(name);
    if (name) {
      this.restaurantService.getRestaurantByName(name).subscribe(
        (data: Restoran) => {
          this.restaurant = data;
        },
        (error) => {
          console.error('Greška prilikom dohvatanja restorana', error);
        }
      );
    }
  }

  createForm(): void {
    this.reservationForm = this.fb.group({
      korisnickoIme: ['', Validators.required],
      imeGosta: ['', Validators.required],
      datumVremeRezervacije: ['', Validators.required],
      brojGostiju: ['', Validators.required],
      komentarGosta: [''],
      brojStola: ['']
    });
  }

  onSubmit(): void {
    if (this.reservationForm?.valid) {
      this.reservationService.createReservation(this.reservationForm.value).subscribe(
        response => {
          console.log('Reservation created successfully:', response);
          this.submitReservation.emit();
        },
        error => {
          console.error('Error creating reservation:', error);
        }
      );
    }
  }


}
