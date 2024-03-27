import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterService } from '../../../Services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private signupService: RegisterService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.form.valid) {
      this.signupService.submitForm(this.form.value).subscribe(
        (response) => {
          console.log(response);
          this.form.reset();
          //alert("User register successfully")
          // this.showSnackbarTopPosition(
          //   'User register successfully!',
          //   null,
          //   3000
          // );

          // this.snackBar.open(
          //   'User register successfully!',
          //   'Close',
          //   {
          //     duration: 3000,
          //     verticalPosition: 'top',
          //   }
          // );
        },
        (error) => {
          this.form.reset();
          // alert('Failed to user register');
          // this.showSnackbarTopPosition('Failed to user register!', null, 3000);

          // this.snackBar.open(
          //   'Failed to user register!',
          //   'Close',
          //   {
          //     duration: 3000,
          //     verticalPosition: 'top',
          //   }
          // );
        }
      );
    }
  }

 
}
