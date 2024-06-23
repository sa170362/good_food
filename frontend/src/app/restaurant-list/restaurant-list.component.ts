import { Component, OnInit } from '@angular/core';
import { RestoranService } from '../restoran.service';
import { Restoran } from '../models/restoran';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restoran[] = [];

  constructor(
    private restaurantService: RestoranService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.restaurantService.getAllRestaurants().subscribe(
      (data: Restoran[]) => {
        this.restaurants = data;
      },
      (error) => {
        console.error('API Error', error);
      }
    );
  }

  viewDetails(ime: string): void {
    localStorage.setItem('selectedRestaurantName', ime);
    this.router.navigate(['/restorani/detalji']);
  }
}
