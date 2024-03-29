import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ResetPasswordService } from '../../../Services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  form: any;
  hideold:boolean = true;
  hidenew:boolean = true;

  togglePasswordVisibility1(){
    this.hideold = !this.hideold;
  }

  togglePasswordVisibility2(){
    this.hidenew = !this.hidenew;
  }

  constructor(
    private formBuilder: FormBuilder,
    private resetPasswordSercice:ResetPasswordService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { email, oldPassword, newPassword } = this.form.value;
      this.resetPasswordSercice
        .resetPassword(email, oldPassword, newPassword)
        .subscribe(
          (data) => {
            console.log(data);
            this.form.reset();
            if (data.message == 'Password reset succesfully!') {
              this.snackBar.open('Password reset succesfully!', 'Close', {
                duration: 3000,
                verticalPosition: 'top',
              });
              localStorage.removeItem('token')
              this.router.navigate(['/login']);
            }
            else{
              this.form.reset();
            this.snackBar.open('Failed to reset password!', 'Close', {
              duration: 3000,
              verticalPosition: 'top'
            });
            }
          },
          (error) => {
            console.log(error);
            this.form.reset();
            this.snackBar.open('Failed to reset password!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
          }
        );
      // console.log(this.form.value);
    }
  }
}
