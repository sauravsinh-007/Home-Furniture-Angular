// import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

// export class AuthGuard implements CanActivate {

//   constructor(private router: Router) { }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): boolean {
//     const token = localStorage.getItem("jwtToken"); // Check for the token
//     console.log('token', token)

//     if (token) {
//       // User is authenticated
//       return true;
//     } else {
//       // User is not authenticated, redirect to login
//       this.router.navigate(['/admin/login']);
//       return false;
//     }
//   }
// }

import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('jwtToken');
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
