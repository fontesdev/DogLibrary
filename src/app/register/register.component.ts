import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = new User({ username: '', password: '', likes: [] });
  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }


  register(): void {
    this.userService.allUsers().subscribe({
      next: (users: User[]) => {

        for (let i = 0; i < users.length; i++) {
          if (users[i].username === this.user.username) {

            window.alert("Usuário já existente");
            return;
          }

        }
        this.authService.register(this.user).subscribe({
          next: (user: User) => {
            window.alert("Conta criada com sucesso!");
            this.router.navigate(['/login']);
          },
          error: (err) => {
            window.alert("Erro ao registrar ");
          }
        });
      },
      error: (err) => {
        window.alert("Erro getting usuários");
      }
    });
  }


  onCancel() {
    this.router.navigate(['/login']);
  }
}
