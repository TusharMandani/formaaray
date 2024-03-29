import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { activateGuard } from '../../Guards/activate.guard';


const routes: Routes = [
  {
    path:'patient',
    component:PatientComponent,
    canActivate:[activateGuard]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
