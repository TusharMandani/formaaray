import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './Pages/pagenotfound/pagenotfound.component';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./Pages/patient/patient.module').then((mod) => mod.PatientModule),
  // },

  {
    path: '',
    loadChildren: () =>
      import('./Pages/auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path:'**',
    component:PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
