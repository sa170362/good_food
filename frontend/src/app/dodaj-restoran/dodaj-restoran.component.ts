import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restoran } from '../models/restoran';
import { RestoranService } from '../restoran.service';

@Component({
  selector: 'app-dodaj-restoran',
  templateUrl: './dodaj-restoran.component.html',
  styleUrls: ['./dodaj-restoran.component.css']
})
export class DodajRestoranComponent {
  currentYear: number = new Date().getFullYear();
  restaurant: Restoran = {
    _id: '',
    ime: '',
    adresa: '',
    tip: '',
    kratakOpis: '',
    kontaktOsoba: '',
    workingHoursFrom: '',
    workingHoursTo: '',
    layout: {
      tables: [],
      kitchen: { id: '', x: 0, y: 0, width: 0, height: 0 },
      restroom: { id: '', x: 0, y: 0, width: 0, height: 0 }
    },
    ocena: 0,
    komentari: []
  };
  types: string[] = ['kineski', 'indiski', 'japanski', 'domaća kuhinja', 'italijanski', 'francuski'];
  layoutMap: any;
  constructor(
    private restaurantService: RestoranService,
    private router: Router
  ) {}

  ngOnInit(): void {}
 
  onSubmit(): void {
    this.restaurantService.addRestaurant(this.restaurant).subscribe(
      () => {
        this.router.navigate(['/admin']);
      }
    );
  }
}
