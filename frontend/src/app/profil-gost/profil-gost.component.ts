import { trigger } from '@angular/animations';
import { getLocaleDirection } from '@angular/common';
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
  imageBaseUrl: string = 'http://localhost:4000/uploads/';
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
      // alert(this.user.profilnaSlika)
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
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.validateImage(this.selectedFile);
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

              // this.user.profilnaSlika!= this.selectedFile;
              const formData = new FormData();
              formData.append('kontaktTelefon', this.user.kontaktTelefon);
              formData.append('ime', this.user.ime);
              formData.append('prezime', this.user.prezime);
              formData.append('mejl', this.user.mejl);
              formData.append('brojKreditneKartice', this.user.brojKreditneKartice);
              formData.append('profilnaSlika', this.selectedFile!);
              this.userService.updateUserByAdmin(this.oldUsername, formData).subscribe(
                (updatedUser: Korisnik) => {
                 
                  this.user = updatedUser;
                  this.originalEmail = updatedUser.mejl;
                  localStorage.setItem('selectedUser', JSON.stringify(updatedUser));
                  this.selectedFile=null
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
        // this.user.profilnaSlika!= this.selectedFile;
        const formData = new FormData();
        formData.append('kontaktTelefon', this.user.kontaktTelefon);
        formData.append('ime', this.user.ime);
        formData.append('prezime', this.user.prezime);
        formData.append('mejl', this.user.mejl);
        formData.append('brojKreditneKartice', this.user.brojKreditneKartice);

        
        formData.append('profilnaSlika', this.selectedFile!);
        this.userService.updateUserByAdmin(this.oldUsername, formData).subscribe(
          (updatedUser: Korisnik) => {
      
            this.user = updatedUser;
            this.originalEmail = updatedUser.mejl;
            localStorage.setItem('selectedUser', JSON.stringify(updatedUser));
            this.selectedFile=null
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
  validateImage(file: File): boolean {
    const reader = new FileReader();
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
    return good;
  }
  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;

    if (!this.selectedFile ||  !this.validateImage(this.selectedFile)) {
      this.formErrors.profilnaSlika = 'Image dimensions must be between 100x100 and 300x300 pixels';
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
 
    return isValid;
  }

}
