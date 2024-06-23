import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestoranService } from '../restoran.service';
import { Restoran } from '../models/restoran';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationsService } from '../reservations.service';
import { Rezervacija } from '../models/rezervacija';

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
    private fb: FormBuilder, private reservationService: ReservationsService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    const name = localStorage.getItem('selectedRestaurantName');
    if (name) {
      this.restaurantService.getRestaurantByName(name).subscribe(
        (data: Restoran) => {
          this.restaurant = data;
          this.reservationForm.patchValue({
            imeRestorana: data.ime
          });
        },
        (error) => {
          console.error('Greška prilikom dohvatanja restorana', error);
        }
      );
    }
  }

  createForm(): void {
    this.reservationForm = this.fb.group({
      korisnickoIme: ['konobar567', Validators.required],
      imeGosta: ['', Validators.required],
      datumVremeRezervacije: ['', Validators.required],
      brojGostiju: ['', [Validators.required, Validators.min(1)]],
      brojStola: [''],
      komentarGosta: ['']
    });
  }

  onSubmit(): void {
    console.log('Submit button clicked'); 
    if (this.reservationForm.valid && this.restaurant) {
      const name = localStorage.getItem('selectedRestaurantName');
      
      const reservationData: Rezervacija = {
        korisnickoIme: this.reservationForm.value.korisnickoIme,
        imeGosta: this.reservationForm.value.imeGosta,
        datumVremeRezervacije: new Date(this.reservationForm.value.datumVremeRezervacije),
        brojGostiju: this.reservationForm.value.brojGostiju,
        brojStola: this.reservationForm.value.brojStola,
        komentarGosta: this.reservationForm.value.komentarGosta,
        datumKreiranja: new Date(),
        imeRestorana: name || '',
      };
      
      this.reservationService.kreirajRezervaciju(reservationData).subscribe(
        response => {
          console.log('Rezervacija uspešno kreirana:', response);
          alert('Rezervacija uspešno kreirana!');
          this.reservationForm.reset();
        },
        error => {
          console.error('Greška pri kreiranju rezervacije:', error);
          alert('Greška pri kreiranju rezervacije!');
        }
      );
    } else {
      this.markFormControlsAsTouched(); // Označi sva polja forme kao dodirnuta ako forma nije validna
    }
  }

  markFormControlsAsTouched(): void {
    Object.keys(this.reservationForm.controls).forEach(field => {
      const control = this.reservationForm.get(field);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(innerField => {
          control.get(innerField)?.markAsTouched({ onlySelf: true });
        });
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }


}
