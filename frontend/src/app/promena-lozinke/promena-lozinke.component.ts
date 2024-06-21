import { HttpErrorResponse } from '@angular/common/http';
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

  oldPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  username: string = '';
  securityAnswer: string = '';
  isSecurityQuestionStep: boolean = false;
  isResetSuccessful: boolean = false;
  showForgotPasswordLink: boolean = true;
  korisnik: Korisnik | null = null;
  constructor(private userService: UsersService) { }
  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.korisnik = storedUser ? JSON.parse(storedUser) : null;
    
  }
  onSubmitChangePassword() {
    // Simulate password change logic
    if (this.oldPassword === 'currentPassword') {
      if (this.newPassword === this.confirmNewPassword) {
        // Password change successful
        this.isResetSuccessful = true;
        this.isSecurityQuestionStep = false;
        this.showForgotPasswordLink = false; // Hide forgot password link after successful change
      } else {
        alert('New passwords do not match.');
      }
    } else {
      alert('Old password is incorrect.');
    }
  }

  onSubmitSecurityQuestion() {
    // Simulate security question validation logic
    if (this.securityAnswer === 'answer') {
      // Security question answered correctly, proceed to new password
      this.isSecurityQuestionStep = false;
      this.isResetSuccessful = false;
    } else {
      alert('Security answer is incorrect.');
    }
  }

  onSubmitNewPassword() {
    if (this.newPassword === this.confirmNewPassword) {
      // Password change successful
      this.isResetSuccessful = true;
      this.isSecurityQuestionStep = false;
      this.showForgotPasswordLink = false; // Hide forgot password link after successful change
    } else {
      alert('New passwords do not match.');
    }
  }
}
