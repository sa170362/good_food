import { Component } from '@angular/core';
import {  UsersService} from '../users.service';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegisterComponent {
  constructor(private servis: UsersService, private ruter: Router){}
  currentYear: number = new Date().getFullYear();
  user: Korisnik = new Korisnik()
  formErrors: any = {};
  usernameExists: boolean = false;
  emailExists: boolean = false;
  userFound: Korisnik = new Korisnik()
  selectedFile: File | null = null;

  // selectedFile: File = null;
  defaultImage: string = 'path/to/default/image.png';

  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];

  //   if (this.selectedFile && (this.selectedFile.type === 'image/png' || this.selectedFile.type === 'image/jpeg')) {
  //     if (this.selectedFile.size > 100 * 1024 && this.selectedFile.size < 300 * 1024) {
  //       // Valid file selected
  //       this.user.profilnaSlika= this.selectedFile || this.defaultImage;
  //     } else {
  //       // File size not within range, handle error
  //     }
  //   } else {
  //     // Invalid file type, handle error
  //   }}

  // register(){
  //   this.servis.register(this.user).subscribe(
  //     data=>{
  //       if(data.message=="ok") alert("Dodato")
  //     }
  //   )
  // }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.validateImage(this.selectedFile);
    }
  }

  register(): void {
    if (this.validateForm()) {
      this.servis.checkUsernameExists(this.user.korisnickoIme).subscribe(
        exists => {
          this.usernameExists = exists;
          if (exists) {
            this.formErrors.korisnickoIme = "Username already exists";
          } else {
            this.servis.checkEmailExists(this.user.mejl).subscribe(
              emailExists => {
                this.emailExists = emailExists;
                if (emailExists) {
                  this.formErrors.email = "Email already exists";
                } else {
                  // // Proceed with registration
                  // if(!this.selectedFile){
                  //   this.selectedFile=new File([],'assets/default_profile.jpg');
                  // }
                  // this.user.profilnaSlika = this.selectedFile.name;
                  const formData = new FormData();
                  formData.append('korisnickoIme', this.user.korisnickoIme);
                  formData.append('lozinka', this.user.lozinka);
                  formData.append('ime', this.user.ime);
                  formData.append('prezime', this.user.prezime);
                  formData.append('mejl', this.user.mejl);
                  formData.append('sigurnosnoPitanje', this.user.sigurnosnoPitanje);
                  formData.append('sigurnosniOdgovor', this.user.sigurnosniOdgovor);
                  formData.append('adresa', this.user.adresa);
                  formData.append('pol', this.user.pol);
                  formData.append('kontaktTelefon', this.user.kontaktTelefon);
                  formData.append('brojKreditneKartice', this.user.brojKreditneKartice);
                  formData.append('profilnaSlika', this.selectedFile ? this.selectedFile : new File([], 'assets/default_profile.jpg'));
                  this.servis.register(formData).subscribe(
                    data => {
                      if (data.message === "ok") {
                        alert("Successfully registered");
                        this.user = new Korisnik();
                        this.ruter.navigate(['/login'])
                  
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
  validateEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }

  validatePhone(phone: string): boolean {
    const pattern = /^06[0-9]{7}$/;
    return pattern.test(phone);
  }
  
  validatePassword(password:string):boolean{
    const pattern =  /^(?=.*[a-z]{3,})(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[\w@$!%*?&]{6,10}$/;
    return pattern.test(password);
  }
  validateImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        if (img.width >= 100 && img.height >= 100 && img.width <= 300 && img.height <= 300) {
          this.formErrors.profilnaSlika = '';
          this.selectedFile = file;
        } else {
          this.formErrors.profilnaSlika = 'Image dimensions must be between 100x100 and 300x300 pixels';
          this.selectedFile = null;
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;


    if (!this.user.korisnickoIme) {
      this.formErrors.korisnickoIme = "Username is required";
      isValid = false;
    }

    if (!this.user.lozinka) {
      this.formErrors.lozinka = "Password is required";
      isValid = false;
    } else if (!this.validatePassword(this.user.lozinka)) {
      this.formErrors.lozinka = "Invalid password format";
      isValid = false;
    }

    if (!this.user.ime) {
      this.formErrors.ime = "Firstname is required";
      isValid = false;
    }

    if (!this.user.prezime) {
      this.formErrors.prezime = "Lastname is required";
      isValid = false;
    }

    if (!this.user.pol) {
      this.formErrors.pol = "Gender is required";
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
    if (!this.user.sigurnosnoPitanje) {
      this.formErrors.bezbednosnoPitanje = "Security question is required";
      isValid = false;
    }

    if (!this.user.sigurnosniOdgovor) {
      this.formErrors.bezbednosniOdgovor = "Security answer is required";
      isValid = false;
    }
    if (!this.user.brojKreditneKartice) {
      this.formErrors.brojKreditneKartice = "Broj kreditne kartice is required";
      isValid = false;
    }

    // if (!this.user.profilnaSlika) {
    //   this.formErrors.profilnaSlika = "Profile picture is required";
    //   isValid = false;
    // }

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
  //           this.user.profilnaSlika = file; // Store the file in a separate variable
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