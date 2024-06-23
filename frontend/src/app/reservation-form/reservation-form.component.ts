import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm!: FormGroup; // Inicijalizacija FormGroup

  @Output() submitReservation: EventEmitter<void> = new EventEmitter<void>(); // Emitovanje događaja

  constructor(private fb: FormBuilder, private reservationService: ReservationsService) { }

  ngOnInit(): void {
    this.createForm(); // Call createForm method to initialize the form
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
