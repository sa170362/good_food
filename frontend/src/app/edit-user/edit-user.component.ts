import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Router , ActivatedRoute} from '@angular/router';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: Korisnik = new Korisnik();
  currentYear: number = new Date().getFullYear();
  oldUsername:string =''
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService
  ) {
    // this.selectedUser = JSON.parse(localStorage.getItem('selectedUser'));
  }

  ngOnInit(): void {
    const storedUserJson = localStorage.getItem('selectedUser');
    if (storedUserJson) {
      this.user = JSON.parse(storedUserJson);
      this.oldUsername = this.user.korisnickoIme;
    } else {
      const korisnickoIme = this.route.snapshot.paramMap.get('korisnickoIme');
      if (korisnickoIme) {
        this.userService.getUserByUsername(this.user.korisnickoIme).subscribe(
          (user: Korisnik) => {
            this.user = user;
          }
        );
      }
    }
  }
  onSubmit(): void {

    this.userService.updateUserByAdmin(this.oldUsername, this.user).subscribe(
      () => {
        this.router.navigate(['/admin']);
      }
    );
  }
}
