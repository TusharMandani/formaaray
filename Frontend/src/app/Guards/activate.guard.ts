import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const activateGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService(); 
  const isLoggedIn = authService.isLoggedIn();

  if(isLoggedIn){
    return true;
  } else{
    console.log("User is not logged in")
    const router = new Router();
    router.navigate(['/login'])
    return false;
  }
};
