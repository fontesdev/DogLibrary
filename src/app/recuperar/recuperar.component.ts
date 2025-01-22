import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './recuperar.component.html',
  styleUrl: './recuperar.component.css'
})
export class RecuperarComponent {
  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }
  oldPassword: string;
  newPassword: string;
  
  changePassword() {
    if (this.oldPassword == this.newPassword) {
      window.alert("As senhas são iguais!");
    }
    else {
      if(this.newPassword.length < 8){
        window.alert("A nova senha tem que ter mais que 8 caracteres!");
      }
      else{
        if (this.authService.userLogged.password == this.oldPassword) {
          this.authService.userLogged.password = this.newPassword;
          this.userService.changePassword(this.authService.userLogged).subscribe({
            next: (response) => {
              this.authService.userLogged = response;
              window.alert("Password alterada com sucesso!");
              this.router.navigate(['/']);
            }
          })
        }
        else{
          window.alert("A password antiga indicada não coincide com a senha atual!");
        }
      }
    }
  }
}
