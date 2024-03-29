import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { activateGuard } from '../../Guards/activate.guard';
import { deactivateGuard } from '../../Guards/deactivate.guard';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent,
    canDeactivate:[deactivateGuard]
  },
  {
    path:'resetpassword',
    component:ResetPasswordComponent,
    canActivate:[activateGuard]
  },{
    path:'forgetpassword',
    component:ForgetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
