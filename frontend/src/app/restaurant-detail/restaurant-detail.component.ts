import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestoranService } from '../restoran.service';
import { Restoran } from '../models/restoran';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit{
  restaurant: Restoran | undefined;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestoranService
  ) { }

  ngOnInit(): void {
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


}
