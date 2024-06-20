import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestoranService } from '../restoran.service';

@Component({
  selector: 'pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  restorani: any[] = [];
  sortByOptions = ['name', 'address', 'type'];
  searchQuery: string = '';

  constructor(private restoranService: RestoranService) { }

  ngOnInit(): void {
    this.fetchRestaurants();
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

}