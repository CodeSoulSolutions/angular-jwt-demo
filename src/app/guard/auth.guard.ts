import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // authService.checkAuthentication(); // Ensure authentication state is restored

  const isAuthenticated = authService.isAuthenticated();
  const requiredRole = route.data?.['role']; // Get the required role from route data

  console.log('AuthGuard - isAuthenticated:', isAuthenticated);
  // console.log('AuthGuard - requiredRole:', requiredRole);
  console.log('AuthGuard - userRole:', authService.userRole());

  if (isAuthenticated) {
    if (requiredRole && !authService.hasRole(requiredRole)) {
      // If the user doesn't have the required role, redirect to a forbidden page
      router.navigate(['/forbidden']);
      console.log('AuthGuard - User does not have the required role');
      return false;
    }
    return true; // Allow access to the route
  } else {
    router.navigate(['/login']);
    console.log('AuthGuard - User is not authenticated');
    return false; // Deny access to the route
  }
};
