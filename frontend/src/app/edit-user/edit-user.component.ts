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
  formErrors: any = {};
  usernameExists: boolean = false;
  emailExists: boolean = false;
  userFound: Korisnik = new Korisnik()
  selectedFile: File | null = null;
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

    // this.userService.updateUserByAdmin(this.oldUsername, this.user).subscribe(
    //   () => {
    //     this.router.navigate(['/admin']);
    //   }
    // );

    if (this.validateForm()) {
      this.userService.checkUsernameExists(this.user.korisnickoIme).subscribe(
        exists => {
          this.usernameExists = exists;
          if (exists) {
            this.formErrors.korisnickoIme = "Username already exists";
          } else {
            this.userService.checkEmailExists(this.user.mejl).subscribe(
              emailExists => {
                this.emailExists = emailExists;
                if (emailExists) {
                  this.formErrors.email = "Email already exists";
                } else {
                  const formData = new FormData();
                  formData.append('kontaktTelefon', this.user.kontaktTelefon);
                  formData.append('ime', this.user.ime);
                  formData.append('prezime', this.user.prezime);
                  formData.append('mejl', this.user.mejl);
                  formData.append('brojKreditneKartice', this.user.brojKreditneKartice);
                  formData.append('profilnaSlika', this.selectedFile!);
                  
                 this.userService.updateUserByAdmin(this.oldUsername, formData).subscribe(
      () => {
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

  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;


    if (!this.user.korisnickoIme) {
      this.formErrors.korisnickoIme = "Username is required";
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
  
    // if (!this.user.profilnaSlika) {
    //   this.formErrors.profilnaSlika = "Profile picture is required";
    //   isValid = false;
    // }

    return isValid;
  }
}
