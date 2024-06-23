import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  username: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private userService: UsersService, private router: Router) {}
  ngOnInit(): void {
    
  }
  validatePassword(password:string):boolean{
    
    const pattern =  /^(?=.*[a-z]{3,})(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[\w@$!%*?&]{6,10}$/;
    return pattern.test(password);
  }
  onSubmit() {
    if (!this.oldPassword || !this.newPassword) {
      this.message = 'Old password and new password are required fields.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.message = 'New password and confirm password do not match';
      return;
    }

    if (!this.validatePassword(this.newPassword)) {
      alert(this.newPassword)
      this.message ="Invalid password format";
      return;
    }

    this.userService.changePassword(this.username, this.oldPassword, this.newPassword).subscribe(
      (response: any) => {
        this.message = response.message;
        this.router.navigate(['/login'], { queryParams: { message: 'Lozinka uspešno promenjena' } });
      },
      (error: any) => {
        if (error.status === 403) {
          this.message = 'Pogrešna stara lozinka.';
        } else if (error.status === 404) {
          this.message = 'Korisnik nije pronađen, proverite unesene kredencijale.';
        } else {
          this.message = 'Greška pri promeni lozinke: ' + error.error.message;
        }
      }
    );
  }
}
