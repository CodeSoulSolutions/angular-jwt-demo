import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: DashboardComponent, canActivate: [authGuard] },
    // { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuard], data: { role: 'admin' } }, // Only accessible by admin
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuard], data: { role: 'admin' } },
    { path: 'forbidden', component: ForbiddenComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];