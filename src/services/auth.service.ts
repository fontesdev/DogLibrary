import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { Observable, lastValueFrom, map } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogged: User | null = null;

    constructor(private http: HttpClient, private route: Router) { }

    public async isUserLogged(): Promise<boolean> {
      const username = localStorage.getItem('username');
      if(username != null && username.trim() !== "" ){
        let url : string = `http://localhost:3000/users?username=${username}`;
        const getuser$ = this.http.get(url).pipe(map((resp : User[]) => {
          if (resp.length != 0) {
              this.userLogged = resp[0];  
          }
          return true;
        })
      );
        await lastValueFrom(getuser$);
      }
      return this.userLogged != null;
    }

  public login(username: string, password: string): Observable<boolean> {
      let url : string = `http://localhost:3000/users?username=${username}&password=${password}`;
      return this.http.get(url).pipe(map((resp : User[]) => {
          if (resp.length != 0) {
              this.userLogged = resp[0];
              localStorage.setItem('username',this.userLogged.username);
              return true;
          } else {
              return false;
            }
          })
      );
  }

  public register(user: User): Observable<User> {
    return this.http.post(`http://localhost:3000/users`, user).pipe(map((response: any) => {
        return new User(response)
    }))
}

  public logout(): void {
    this.userLogged = null;
    this.route.navigate(['/login']);
    localStorage.removeItem('username');
  }
}