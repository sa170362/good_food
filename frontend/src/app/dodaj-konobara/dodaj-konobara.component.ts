import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Restoran } from '../models/restoran';
import { RestoranService } from '../restoran.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-dodaj-konobara',
  templateUrl: './dodaj-konobara.component.html',
  styleUrls: ['./dodaj-konobara.component.css']
})
export class DodajKonobaraComponent implements OnInit{
  currentYear: number = new Date().getFullYear();
  waiter: Korisnik = new Korisnik();
  restaurants: Restoran[] = [];
  formErrors: any = {};
  usernameExists: boolean = false;
  emailExists: boolean = false;
  userFound: Korisnik = new Korisnik()
  selectedFile: File | null = null;

  constructor(
    private usersService: UsersService,
    private restaurantService: RestoranService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe(
      (restaurants: Restoran[]) => {
        this.restaurants = restaurants;
      }
    );
  }

  onSubmit(): void {
    this.register();
  }
  register(): void {
    if (this.validateForm()) {
      this.usersService.checkUsernameExists(this.waiter.korisnickoIme).subscribe(
        exists => {
          this.usernameExists = exists;
          if (exists) {
            this.formErrors.korisnickoIme = "Username already exists";
          } else {
            this.usersService.checkEmailExists(this.waiter.mejl).subscribe(
              emailExists => {
                this.emailExists = emailExists;
                if (emailExists) {
                  this.formErrors.email = "Email already exists";
                } else {
                  this.usersService.registerKonobar(this.waiter).subscribe(
                    () => {
                      this.waiter= new Korisnik();
                      this.router.navigate(['/admin']);
                    }
                  );
                }
              }
            );
          }
        }
      
      );
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
  validatePassword(password:string):boolean{
    const pattern =  /^(?=.*[a-z]{3,})(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[\w@$!%*?&]{6,10}$/;
    return pattern.test(password);
  }
  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;


    if (!this.waiter.korisnickoIme) {
      this.formErrors.korisnickoIme = "Username is required";
      isValid = false;
    }

    if (!this.waiter.lozinka) {
      this.formErrors.lozinka = "Password is required";
      isValid = false;
    } else if (!this.validatePassword(this.waiter.lozinka)) {
      this.formErrors.lozinka = "Invalid password format";
      isValid = false;
    }

    if (!this.waiter.ime) {
      this.formErrors.ime = "Firstname is required";
      isValid = false;
    }

    if (!this.waiter.prezime) {
      this.formErrors.prezime = "Lastname is required";
      isValid = false;
    }

    if (!this.waiter.pol) {
      this.formErrors.pol = "Gender is required";
      isValid = false;
    }

    if (!this.waiter.adresa) {
      this.formErrors.adresa = "Address is required";
      isValid = false;
    }

    if (!this.waiter.kontaktTelefon) {
      this.formErrors.kontaktTelefon = "Contact Phone is required";
      isValid = false;
    } else if (!this.validatePhone(this.waiter.kontaktTelefon)) {
      this.formErrors.kontaktTelefon = "Invalid phone number format";
      isValid = false;
    }

    if (!this.waiter.mejl) {
      this.formErrors.email = "Email is required";
      isValid = false;
    } else if (!this.validateEmail(this.waiter.mejl)) {
      this.formErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!this.waiter.profilnaSlika) {
      this.formErrors.profilnaSlika = "Profile picture is required";
      isValid = false;
    }

    return isValid;
  }

  
  // onFileSelected(event: any): void {
  //   const file: File = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       const img = new Image();
  //       img.onload = () => {
  //         if (img.width >= 100 && img.width <= 300 && img.height >= 100 && img.height <= 300) {
  //           this.waiter.profilnaSlika = file;
  //         } else {
  //           this.formErrors.profilnaSlika = 'Profile picture must be between 100x100 px and 300x300 px.';
  //         }
  //       };
  //       img.src = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  //   alert(this.selectedFile?.name);
  // }
}
