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
    this.route.params.subscribe(params => {
      const ime = params['ime'];
      if (ime) {
        this.getRestoran(ime);
      }
    });
  }

  getRestoran(ime: string): void {
    this.restaurantService.searchRestaurantsByName(ime)
      .subscribe(
        (restoran) => { 
          this.restaurant = restoran;
        },
        (error) => {
          console.error('Greška prilikom dohvatanja restorana', error);
        }
      );
  }


}
