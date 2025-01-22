import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { DogService } from '../../services/dog.service';
import { UserService } from '../../services/user.service';
import { Dog } from '../../models/dog.model';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Observable, Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent {
  letras: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  user: User = this.authService.userLogged;
  pagina: number = 1;
  limite: number = 9;
  ArrayDog: Dog[] = [];
  pesquisa: string = "";
  ArrayLikes: number[] = [];
  msg:string = "";

  constructor(private dogService: DogService, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllDogs();
  }

  estaFavoritado(id: number): boolean{
    for (let like of this.authService.userLogged.likes) {
      if (like == id) {
        return true;
      }
    }
    return false;
  }

  getAllDogs() {
    this.msg = "";
    this.desativarbotoes = false;
    this.pesquisa = '';
    this.dogService.obterCaes(this.pagina, this.limite).subscribe({
      next: (response) => {
        this.ArrayDog = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  desativarbotoes : boolean = false;
  pagSearch: number = 1;
  
  procurarDog(pesquisa: string) {
    this.letraa = "";
    if(pesquisa != ""){
      this.msg = "";
      this.desativarbotoes = true;
    }
    else{
      this.desativarbotoes = false;
      this.msg = "";
      this.pagina = 1;
      this.getAllDogs();
    }
    this.dogService.procurarDog(pesquisa, this.pagSearch, this.limite).subscribe({
      next: (response) => {
        if(response == ""){
          this.ArrayDog = null;
          this.msg = "Não foram encontradas raças com esse filtro: "+this.pesquisa;
        }
        else{
          this.ArrayDog = response;
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  letraa: string = "";
  procurarDogLetra(l: string) {
    this.pesquisa = "";
    this.letraa = l;
    if(l != ""){
      this.msg = "";
      this.desativarbotoes = true;
    }
    else{
      this.desativarbotoes = false;
      this.msg = "";
      this.pagina = 1;
      this.getAllDogs();
    }
    this.dogService.procurarDogLetra(l, this.pagSearch, this.limite).subscribe({
      next: (response) => {
        if(response == ""){
          this.ArrayDog = null;
          this.msg = "Não foram encontradas raças onde o nome começe por esse filtro: "+this.letraa;
        }
        else{
          this.ArrayDog = response;
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  resetPaginacao(){
    this.pagSearch = 1;
    this.procurarDog(this.pesquisa);
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
  }

  addPagSearch() {
    this.pagSearch++;
    this.procurarDog(this.pesquisa);
  }

  addPag() {
    this.pagina++;
    this.getAllDogs();
  }

  rmvPagSearch() {
    this.pagSearch--;
    this.procurarDog(this.pesquisa);
  }

  rmvPag() {
    this.pagina--;
    this.getAllDogs();
  }

}
