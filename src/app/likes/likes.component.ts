import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user.model';
import { DogService } from '../../services/dog.service';
import { UserService } from '../../services/user.service';
import { Dog } from '../../models/dog.model';

@Component({
  selector: 'app-likes',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent, RouterLink],
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.css'
})
export class LikesComponent {
  user: User = this.authService.userLogged;
  dogsLiked: Dog[] = [];
  constructor(private dogService: DogService, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.showLikedDogs();
  }

  showLikedDogs() {
    for (let idDogLiked of this.authService.userLogged.likes) {
      this.dogService.likedCaes(idDogLiked).subscribe({
        next: (response) => {
          this.dogsLiked.push(response);
        }
      })
    }
  }

  estaFavoritado(id: number): boolean{
    for (let like of this.authService.userLogged.likes) {
      if (like == id) {
        return true;
      }
    }
    return false;
  }

  favoritar(id: number) {
    if (this.estaFavoritado(id)) {
      let findIndex: number = this.authService.userLogged.likes.findIndex((element) => element == id);
      this.authService.userLogged.likes.splice(findIndex, 1);
    }
    else {
      this.authService.userLogged.likes.push(id);
    }

    this.userService.addLike(this.authService.userLogged).subscribe({
      next: (response) => {
        console.log(response);
        this.authService.userLogged = response;
      }
    })

    location.reload();
  }
}
