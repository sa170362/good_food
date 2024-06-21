import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {
  user: Korisnik = new Korisnik();
  currentYear: number = new Date().getFullYear();
  oldUsername:string =''
  formErrors: any = {};
  usernameExists: boolean = false;
  emailExists: boolean = false;
  userFound: Korisnik = new Korisnik()
  selectedFile: File | null = null;
  originalEmail: string ='';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService
  ) {

  }

  ngOnInit(): void {
    const storedUserJson = localStorage.getItem('selectedUser');
    if (storedUserJson) {
      this.user = JSON.parse(storedUserJson);
      this.oldUsername = this.user.korisnickoIme;
      this.originalEmail = this.user.mejl;
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
    if (this.validateForm()) {
    
  
      // Check if email field has been changed
      if (this.user.mejl !== this.originalEmail) {
        this.userService.checkEmailExists(this.user.mejl).subscribe(
          emailExists => {
            this.emailExists = emailExists;
            if (emailExists) {
              
              this.formErrors.email = "Email already exists";
            } else {
              // Proceed to update user if email does not exist and it has been changed
              this.userService.updateUserByAdmin(this.oldUsername, this.user).subscribe(
                (updatedUser: Korisnik) => {
                  // Update user object with new values
                  this.user = updatedUser;
                  // Optionally update originalEmail if needed
                  this.originalEmail = updatedUser.mejl;
                  // Update localStorage with updated user
                  localStorage.setItem('selectedUser', JSON.stringify(updatedUser));
                  // Navigate to admin page or any other logic
                  this.router.navigate(['/profil']);
                },
                error => {
                  console.error('Error updating user:', error);
                  // Handle error if necessary
                }
              );
            }
          },
          error => {
            console.error('Error checking email:', error);
            // Handle error if necessary
          }
        );
      } else {
        // Email has not been changed, proceed directly to update user
        this.userService.updateUserByAdmin(this.oldUsername, this.user).subscribe(
          (updatedUser: Korisnik) => {
            // Update user object with new values
            this.user = updatedUser;
            // Optionally update originalEmail if needed
            this.originalEmail = updatedUser.mejl;
            // Update localStorage with updated user
            localStorage.setItem('selectedUser', JSON.stringify(updatedUser));
            // Navigate to admin page or any other logic
            this.router.navigate(['/profil']);
          },
          error => {
            console.error('Error updating user:', error);
            // Handle error if necessary
          }
        );
      }
    }
  }

  validateEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }

  validatePhone(phone: string): boolean {
    const pattern = /^[0-9]{9}$/;
    return pattern.test(phone);
  }
  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;


  

    if (!this.user.ime) {
      this.formErrors.ime = "Firstname is required";
      isValid = false;
    }

    if (!this.user.prezime) {
      this.formErrors.prezime = "Lastname is required";
      isValid = false;
    }

   

    if (!this.user.adresa) {
      this.formErrors.adresa = "Address is required";
      isValid = false;
    }

    if (!this.user.kontaktTelefon) {
      this.formErrors.kontaktTelefon = "Contact Phone is required";
      isValid = false;
    } else if (!this.validatePhone(this.user.kontaktTelefon)) {
      this.formErrors.kontaktTelefon = "Invalid phone number format";
      isValid = false;
    }

    if (!this.user.mejl) {
      this.formErrors.email = "Email is required";
      isValid = false;
    } else if (!this.validateEmail(this.user.mejl)) {
      this.formErrors.email = "Invalid email format";
      isValid = false;
    }
  
    // if (!this.user.profilnaSlika) {
    //   this.formErrors.profilnaSlika = "Profile picture is required";
    //   isValid = false;
    // }

    return isValid;
  }
}
