import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { User } from "../models/user.model";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
  })
export class UserService {

    constructor(private http: HttpClient) { }
    allUsers(): Observable<User[]> {
        return this.http.get(`http://localhost:3000/users`).pipe(map((response: any) => {
            return response.map((u: any) => new User(u))
        }))
    }

    addLike(user: User): Observable<User> {
        console.log(user);
        return this.http.patch<User>(`http://localhost:3000/users/${user.id}`, {
            likes: user.likes
        })
    }

    getOneUser(user: User): Observable<User> {
        return this.http.get(`http://localhost:3000/users?username=${user.username}`).pipe(map((response: any) => {
            return new User(response)
        }))
    }

    changePassword(user: User): Observable<User> {
        return this.http.patch<User>(`http://localhost:3000/users/${user.id}`, {
            password: user.password
        })

    }

}