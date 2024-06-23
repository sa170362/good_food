import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Restoran } from '../models/restoran';
import { RestoranService } from '../restoran.service';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-administrator-pocetna',
  templateUrl: './administrator-pocetna.component.html',
  styleUrls: ['./administrator-pocetna.component.css']
})
export class AdministratorPocetnaComponent implements OnInit  {
  
  guests: Korisnik[] = [];
  waiters: Korisnik[] = [];
  restaurants: Restoran[] = [];
  users: Korisnik[] = [];
  private currentUser: Korisnik | null = null;
  currentYear: number = new Date().getFullYear();
  constructor(private usersService: UsersService, private restaurantsService: RestoranService, private router: Router) {}
  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    this.fetchGuests();
    this.fetchWaiters();
    this.fetchRestaurants();
    this.fetchUsers();}


    fetchGuests(): void {
      this.usersService.getUsersByType('gost').subscribe((users: Korisnik[]) => {
        this.guests = users;
      });
    }
    fetchUsers(): void {
      this.usersService.getUsersBlocked().subscribe((users: Korisnik[]) => {
        this.users = users;
      });
    }
  
    fetchWaiters(): void {
      this.usersService.getUsersByType('konobar').subscribe((users: Korisnik[]) => {
        this.waiters = users;
      });
    }
  
    fetchRestaurants(): void {
      this.restaurantsService.getRestaurants().subscribe((restaurants: Restoran[]) => {
        this.restaurants = restaurants;
      });
    }
    deactivateUserGuest(username: string) {
      this.usersService.deactivateUserGuest(username).subscribe(response => {
        if (response.message === 'ok') {
   
          // this.fetchGuests(); // Reload the users after deactivation
          // this.router.naviga/te([this.router.url]);
          this.ngOnInit()
        }
      });
    }
    deactivateUserKonobar(username: string) {
      this.usersService.deactivateUserKonobar(username).subscribe(response => {
        if (response.message === 'ok') {
          this.router.navigate([this.router.url]);
          // this.fetchWaiters(); // Reload the users after deactivation
          this.ngOnInit()
        }
      });
    }
    updateUser(korisnickoIme: string, updatedData: any) {
      this.usersService.updateUserByAdmin(korisnickoIme, updatedData).subscribe(user => {
        // Update the user in the list or refresh the list
      });
    }
    navigateToEditUser(korisnik: Korisnik) {
      localStorage.setItem('selectedUser', JSON.stringify(korisnik));
      this.router.navigate([`/edit-user/${korisnik.korisnickoIme}`]);
    }
    dodajMapu(ime: string) {
      this.router.navigate(['/restoranMapa', ime]);
    }
    unblockUser(korisnickoIme:string){
      this.usersService.unblockUser(korisnickoIme).subscribe(user => {
        // Update the user in the list or refresh the list
   this.ngOnInit()
        
        // this.router.navigate([this.router.url]);
      });
    }
    logout(): void {
      this.currentUser = null;
      localStorage.removeItem('currentUser');
    }
    isLoggedIn(): boolean {
      return this.currentUser !== null;
    }
}
