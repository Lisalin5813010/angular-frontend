import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isLoggedIn()) {
    return true; // Allow access if the user is logged in
  } else {
    router.navigate(['/login']); // Redirect to the login page if the user is not logged in
    return false;
  }
};
