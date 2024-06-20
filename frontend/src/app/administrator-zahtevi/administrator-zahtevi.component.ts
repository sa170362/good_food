import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { RestoranService } from '../restoran.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-administrator-zahtevi',
  templateUrl: './administrator-zahtevi.component.html',
  styleUrls: ['./administrator-zahtevi.component.css']
})
export class AdministratorZahteviComponent  implements OnInit{
  korisnici: Korisnik[] = [];
  constructor(private usersService: UsersService, private restaurantsService: RestoranService) {}
  ngOnInit(): void {
    this.fetchRequests();
   ;}

   fetchRequests(): void {
    this.usersService.getUsersPending().subscribe((users: Korisnik[]) => {
      this.korisnici = users;
    });
  }
  activateUser(username: string) {
    this.usersService.activateUser(username).subscribe(response => {
      if (response.message === 'ok') {
 
        this.fetchRequests(); // Reload the users after deactivation
      }
    });
  }
  rejectUser(username: string) {
    this.usersService.rejectUser(username).subscribe(response => {
      if (response.message === 'ok') {
 
        this.fetchRequests(); // Reload the users after deactivation
      }
    });
  }
}
