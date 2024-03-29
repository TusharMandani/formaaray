import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../../../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  hide:boolean = true;
  togglePasswordVisibility(){
    this.hide = !this.hide
  }


  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.form.valid) {
      this.loginService.submitForm(this.form.value).subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          if (response.token == undefined) {
            this.snackBar.open('Failed to login!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
          } else {
            this.snackBar.open('User login successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
            this.router.navigate(['/patient']);
          }
        },
        (error) => {
          this.snackBar.open('Failed to login!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
      );
    }
    this.form.reset();
  }
}
