import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  showOldPasswordForm: boolean = true;
  showSecurityQuestionForm: boolean = false;
  showChangePasswordForm: boolean = false;
  username: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  securityQuestion: string = '';
  securityAnswer: string = '';
  passwordChanged: boolean = false;
  errorMessage: string = '';

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  changePasswordWithOld() {
    // Implement logic to change password with old password
    // Example implementation
    this.userService.changePasswordWithOld(this.username, this.oldPassword, this.newPassword).subscribe(
      () => {
        this.passwordChanged = true;
        this.showOldPasswordForm = false;
      },
      error => {
        this.errorMessage = error.message;
      }
    );
  }

  getSecurityQuestion() {
    // Implement logic to fetch security question based on username
    this.userService.getSecurityQuestion(this.username).subscribe(
      (data: any) => {
        this.securityQuestion = data.question;
        this.showSecurityQuestionForm = true;
      },
      error => {
        this.errorMessage = error.message;
      }
    );
  }

  answerSecurityQuestion() {
    // Implement logic to check security answer and show change password form
    this.userService.answerSecurityQuestion(this.username, this.securityAnswer).subscribe(
      (data: any) => {
        if (data.success) {
          this.showSecurityQuestionForm = false;
          this.showChangePasswordForm = true;
        } else {
          this.errorMessage = 'Incorrect security answer';
        }
      },
      error => {
        this.errorMessage = error.message;
      }
    );
  }

  changePasswordWithSecurityAnswer() {
    // Implement logic to change password after answering security question
    this.userService.changePasswordWithSecurityAnswer(this.username, this.newPassword).subscribe(
      () => {
        this.passwordChanged = true;
        this.showChangePasswordForm = false;
      },
      error => {
        this.errorMessage = error.message;
      }
    );
  }
}
