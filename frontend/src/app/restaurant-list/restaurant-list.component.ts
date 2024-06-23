import { Component, OnInit } from '@angular/core';
import { RestoranService } from '../restoran.service';
import { Restoran } from '../models/restoran';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restoran[] = [];

  constructor(private restaurantService: RestoranService) { }

  ngOnInit(): void {
    this.fetchRestaurants();
  }

  fetchRestaurants() {
    this.restaurantService.getRestaurants().subscribe(
      (data: Restoran[]) => {
        this.restaurants = data;
      },
      (error) => {
        console.error('Error fetching restaurants', error);
      }
    );
  }
}
