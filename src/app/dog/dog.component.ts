import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { DogService } from '../../services/dog.service';
import { UserService } from '../../services/user.service';
import { Dog } from '../../models/dog.model';

@Component({
  selector: 'app-dog',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent, RouterLink],
  templateUrl: './dog.component.html',
  styleUrl: './dog.component.css'
})
export class DogComponent {
  id: number;
  c: Dog | null = null;
  constructor(private dogService: DogService, private activatedRoute: ActivatedRoute, private route:Router) { }
  relatedDogs: Dog[] = [];
  msg: string = "";
  showRelatedDogs: boolean = false;

  ngOnInit(): void {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.dogId();
  }

  dogId() {
    this.c = null;
    this.showRelatedDogs = false;
    this.relatedDogs = [];
    this.dogService.procurarDogId(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (response) => {
        this.c = response;
        if (this.c.relatedIds == undefined) {
          this.msg = "Não tem relações!";
        }
        else {
          this.showRelatedDogs = true;
          for (let id of this.c.relatedIds) {
            this.dogService.procurarDogId(id).subscribe({
              next: (response) => {
                this.relatedDogs.push(response);
              }
            })
          }
        }
      },
      error: (err) => {
        if(err.status = 404){
          window.alert("Raça inexistente!");
          this.route.navigate(['/']);
        }
      }
    });
  }
}
