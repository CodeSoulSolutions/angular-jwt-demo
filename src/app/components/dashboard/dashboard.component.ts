import { Component, computed, OnInit, signal } from '@angular/core';
import { TruncatePipe } from "../../pipe/truncate.pipe";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TruncatePipe, CommonModule, MatCardModule, MatButtonModule, TruncatePipe,MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  username :any;
  unreadMessages = signal(15);
  totalMessages = computed(() => this.unreadMessages() * 2);

  constructor(private authService: AuthService, private router: Router) {
   }

   ngOnInit(): void {
     this.username = localStorage.getItem('username');
   }
   

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToAdminDashboard() {
    this.router.navigate(['/admin-dashboard']);

    // if (this.authService.hasRole('Admin')) {
    //   this.router.navigate(['/admin-dashboard']);
    // } else {
    //   this.router.navigate(['/forbidden']);
    // }
  }
}
