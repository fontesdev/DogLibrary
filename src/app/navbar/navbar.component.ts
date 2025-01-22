import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, LoginComponent, HomeComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user: User = this.authService.userLogged;

  constructor(private router: Router, private authService: AuthService) { }
  
  logout(): void {
    this.authService.logout();
    localStorage.removeItem('username');
  }
}
