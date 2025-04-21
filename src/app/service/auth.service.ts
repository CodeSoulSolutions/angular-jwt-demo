import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private tokenKey = 'authToken'; // Key to store token in localStorage
  isAuthenticated = signal(false); // Signal to track authentication status
  userRole = signal<string | null>(null); // Signal to track user role

  constructor(private http: HttpClient, private router: Router) {
    // this.checkAuthentication();
    this.restoreAuthState();
  }

  login(username: string, password: string) {
    if (username === 'admin' && password === 'admin123') {
      const fakeAdminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MTAyMzEwMDB9.abc123';
      localStorage.setItem(this.tokenKey, fakeAdminToken);
      localStorage.setItem('username', username);
      this.isAuthenticated.set(true);
      this.userRole.set(this.getUserRoleFromToken(fakeAdminToken)); // Set the user's role
      console.log('Token set, navigating to dashboard...');
      this.router.navigate(['/home']);
    } else if (username === 'user' && password === 'user123') {
      const fakeUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlVzZXIiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTcxMDIzMTAwMH0.xyz456';
      localStorage.setItem(this.tokenKey, fakeUserToken);
      localStorage.setItem('username', username);
      this.isAuthenticated.set(true);
      this.userRole.set(this.getUserRoleFromToken(fakeUserToken)); // Set the user's role
      console.log('Token set, navigating to dashboard...');
      this.router.navigate(['/home']);
    } else {
      console.error('Invalid username or password');
      alert('Invalid username or password');
    }
  }

  logout() {
    //  localStorage.removeItem(this.tokenKey);
     localStorage.clear();
    this.isAuthenticated.set(false);
    this.userRole.set(null); // Clear the user's role
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }


  checkAuthentication(): boolean {
    const token = this.getToken();
    if (!token) {
      this.isAuthenticated.set(false);
      this.userRole.set(null);
      return false;
    }
    const decodedToken: any = jwtDecode(token);
    const isExpired = decodedToken.exp < Date.now() / 1000;
    this.isAuthenticated.set(!isExpired);
    this.userRole.set(decodedToken.role || null); // Ensure role is set correctly
    return !isExpired;
  }

  // Extracts role from token (in my case name == role)
  getUserRoleFromToken(token: string): string | null {
    const decodedToken: any = jwtDecode(token);
    console.log('Decoded Token:', decodedToken);
    return decodedToken.name || null;
  }
  
  hasRole(role: string): boolean {
    return this.userRole()?.toLowerCase() === role.toLowerCase();
  }

  restoreAuthState() {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const isExpired = decodedToken.exp < Date.now() / 1000;
      if (!isExpired) {
        this.isAuthenticated.set(true);
        this.userRole.set(decodedToken.role || null);
      } else {
        this.logout(); // Token is expired, log the user out
      }
    } else {
      this.isAuthenticated.set(false);
      this.userRole.set(null);
    }
  }
  
}
