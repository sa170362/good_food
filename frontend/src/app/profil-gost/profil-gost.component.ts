import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profil-gost',
  templateUrl: './profil-gost.component.html',
  styleUrls: ['./profil-gost.component.css']
})
export class ProfilGostComponent  implements OnInit{
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

      if (this.user.mejl !== this.originalEmail) {
        this.userService.checkEmailExists(this.user.mejl).subscribe(
          emailExists => {
            this.emailExists = emailExists;
            if (emailExists) {
              
              this.formErrors.email = "Email already exists";
            } else {

              this.userService.updateUserByAdmin(this.oldUsername, this.user).subscribe(
                (updatedUser: Korisnik) => {
                  this.user = updatedUser;
                  this.originalEmail = updatedUser.mejl;
                  localStorage.setItem('selectedUser', JSON.stringify(updatedUser));
                  this.router.navigate(['/profilGost']);
                },
                error => {
                  console.error('Error updating user:', error);
                }
              );
            }
          },
          error => {
            console.error('Error checking email:', error);
          }
        );
      } else {
        this.userService.updateUserByAdmin(this.oldUsername, this.user).subscribe(
          (updatedUser: Korisnik) => {
            this.user = updatedUser;
            this.originalEmail = updatedUser.mejl;
            localStorage.setItem('selectedUser', JSON.stringify(updatedUser));
            this.router.navigate(['/profilGost']);
          },
          error => {
            console.error('Error updating user:', error);
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
    if (!this.user.brojKreditneKartice) {
      this.formErrors.brojKreditneKartice = "Broj kreditne kartice is required";
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
