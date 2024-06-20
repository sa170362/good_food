import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {
   korisnik: Korisnik | null = null;


  profilnaSlika: File | undefined;
  currentYear: number = new Date().getFullYear();
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.korisnik = storedUser ? JSON.parse(storedUser) : null;
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    if (this.korisnik && this.korisnik.korisnickoIme) {
      this.userService.getUserProfil(this.korisnik.korisnickoIme).subscribe(
        (response: Korisnik) => {
          console.log(response);
          this.korisnik = response;
        },
        (error) => {
          console.error('Failed to load user profile: ', error);
        }
      );
    } else {
      console.error('No user or username available to load profile.');
    }
  }

  updateProfile(): void {
    if (this.korisnik) {
      this.userService.azurirajProfil(this.korisnik).subscribe(
        (response: Korisnik) => {
          console.log('Profile updated successfully: ', response);
          this.korisnik = response; // Update the local copy of korisnik with the response
        },
        (error) => {
          console.error('Failed to update profile: ', error);
        }
      );
    } else {
      console.error('No user profile to update.');
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.profilnaSlika = file;
  }

  uploadProfilePicture(): void {
    if (this.profilnaSlika) {
      this.userService.uploadProfilePicture(this.profilnaSlika).subscribe(
        (response: any) => {
          console.log('Profile picture uploaded successfully: ', response);
          if (this.korisnik) {
            this.korisnik.profilnaSlikaUrl = response.url;
            this.updateProfile(); // Update profile after uploading picture
          }
        },
        (error) => {
          console.error('Failed to upload profile picture: ', error);
        }
      );
    } else {
      console.warn('No profile picture selected.');
    }
  }

}
