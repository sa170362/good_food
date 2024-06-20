import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestoranService } from '../restoran.service';
import { UsersService } from '../users.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  restorani: any[] = [];
  totalRegisteredGuests: number = 0;
  sortByOptions = ['name', 'address', 'type'];
  searchQuery: string = '';

  constructor(private restoranService: RestoranService, private usersService: UsersService) {}

  ngOnInit(): void {
    this.fetchRestaurants();
    this.fetchTotalRegisteredGuests();
  }

  fetchRestaurants() {
    this.restoranService.getRestaurants().subscribe(
      (data: any[]) => {
        this.restorani = data;
      },
      (error) => {
        console.error('Error fetching restaurants', error);
      }
    );
  }
  sortBy(option: string): void {
    this.restorani.sort((a, b) => {
      if (a[option] < b[option]) return -1;
      if (a[option] > b[option]) return 1;
      return 0;
    });
  }

  fetchTotalRegisteredGuests() {
    this.usersService.getTotalRegisteredGuests().subscribe(
      (data: { totalGuests: number }) => {
        this.totalRegisteredGuests = data.totalGuests;
      }
    );
  }
}
