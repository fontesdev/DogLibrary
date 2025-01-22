import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LikesComponent } from './likes/likes.component';
import { DogComponent } from './dog/dog.component';
import { authGuard } from '../guards/auth.guard';
import { nonAuthGuard } from '../guards/nonauth.guard';
import { RegisterComponent } from './register/register.component';
import { RecuperarComponent } from './recuperar/recuperar.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [nonAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [nonAuthGuard],
  },
  {
    path: 'recuperar',
    component: RecuperarComponent,
    canActivate: [authGuard],
  },
  {
    path: 'likes',
    component: LikesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dog/:id',
    component: DogComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];