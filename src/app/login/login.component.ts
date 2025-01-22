import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  @ViewChild("loginForm") form: NgForm;

  username: string;
  password: string;
  erro: string = "Username incorreto!";

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');

    togglePassword.addEventListener('click', function () {
      // Alternar o tipo de input de senha
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);

      // Alternar o ícone
      this.querySelector('i').classList.toggle('fa-eye');
      this.querySelector('i').classList.toggle('fa-eye-slash');
    });
  }

 

  login() : void {
    this.authService.login(this.username, this.password).subscribe({
      next: (resultado: boolean) => {
        if (resultado == true) {
          this.router.navigate(['/'])
        }
        else {
          window.alert('Credenciais invalidas!');
        }
      },
      error: (erro) => { window.alert('Erro a efectuar o login') }

    })
  }
}
