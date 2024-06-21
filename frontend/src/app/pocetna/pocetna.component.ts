import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestoranService } from '../restoran.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  restorani: any[] = [];
  sortByOptions = ['name', 'address', 'type'];
  filteredRestaurants: any[] = [];
  nazivQuery: string = '';
  adresaQuery: string = '';
  tipQuery: string = '';
  sortDirection: string = 'asc';
  sortByOption: string = '';
  sortColumn: string = '';
  brojRegistrovanihGostiju: number = 0;
  constructor(private restoranService: RestoranService, private userService: UsersService) { }

  ngOnInit(): void {
    this.fetchRestaurants();
    this.fetchBrojRegistrovanihGostiju()
  }

  fetchRestaurants() {
    this.restoranService.getRestaurants().subscribe(
      (data: any[]) => {
        this.restorani = data;
        this.filteredRestaurants = data; 
      },
      (error) => {
        console.error('Error fetching restaurants', error);
      }
    );
  }
  fetchBrojRegistrovanihGostiju() {
    this.userService.getBrojRegistrovanihGostiju().subscribe(
      (broj: number) => {
        this.brojRegistrovanihGostiju = broj;
      },
      (error) => {
        console.error('Error fetching number of registered guests', error);
      }
    );
  }
  sortBy(column: string): void {

    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
    
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredRestaurants.sort((a, b) => {
      const nameA = a[this.sortColumn].toLowerCase();
      const nameB = b[this.sortColumn].toLowerCase();
      if (this.sortDirection === 'asc') {
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
      } else {
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
      }
      return 0;
    });
  }

  search(): void {
    this.filteredRestaurants = this.restorani.filter(restoran =>
      (this.nazivQuery === '' || restoran.ime.toLowerCase().includes(this.nazivQuery.toLowerCase())) &&
      (this.adresaQuery === '' || restoran.adresa.toLowerCase().includes(this.adresaQuery.toLowerCase())) &&
      (this.tipQuery === '' || restoran.tip.toLowerCase().includes(this.tipQuery.toLowerCase()))
    );
  }

}