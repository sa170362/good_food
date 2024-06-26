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

  defaultImage: string = '/assets/default_profile.jpg';

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
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.validateImage(this.selectedFile);
    }
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
                 
                  const formData = new FormData();
                  formData.append('korisnickoIme', this.waiter.korisnickoIme);
                  formData.append('lozinka', this.waiter.lozinka);
                  formData.append('ime', this.waiter.ime);
                  formData.append('prezime', this.waiter.prezime);
                  formData.append('mejl', this.waiter.mejl);
                  formData.append('adresa', this.waiter.adresa);
                  formData.append('pol', this.waiter.pol);
                  formData.append('kontaktTelefon', this.waiter.kontaktTelefon);
                  formData.append('restoran', this.waiter.restoran!);
                  formData.append('profilnaSlika', this.selectedFile! );
                  this.usersService.registerKonobar(formData).subscribe(
                    data => {
                      if (data.message === "ok") {
                        alert("Successfully registered");
                        this.waiter = new Korisnik();
                        this.router.navigate(['/admin'])
                  
                      }
                    }
                    // ,
                    // error => {
                    //   console.error('Error registering user:', error);
                    //   alert("Registration failed. Please try again.");
                    // }
                  );
                }
              }
              // ,
              // error => {
              //   console.error('Error checking email:', error);
              //   alert("Error checking email availability. Please try again.");
              // }
            );
          }
        }
        // ,
        // error => {
        //   console.error('Error checking username:', error);
        //   alert("Error checking username availability. Please try again.");
        // }
      );
    }
  }

  validateImage(file: File): boolean {
    if(file){ const reader = new FileReader();
      let good=true;
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          if (img.width >= 100 && img.height >= 100 && img.width <= 300 && img.height <= 300) {
            this.formErrors.profilnaSlika = '';
            this.selectedFile = file;
            good=true;
          } else {
            this.formErrors.profilnaSlika = 'Image dimensions must be between 100x100 and 300x300 pixels';
            this.selectedFile = null;
            // this.enableButton= false;
            good=false;
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
      return good;}
      else{return true}
   
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

    if (!this.validateImage(this.selectedFile!)) {
      this.formErrors.profilnaSlika = 'Image dimensions must be between 100x100 and 300x300 pixels';
      isValid = false;
    }
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


    return isValid;
  }

}
