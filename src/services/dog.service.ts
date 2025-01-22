import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Dog } from "../models/dog.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class DogService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/dogs';

  obterCaes(pagina: number, limite: number): Observable<any[]> {
      return this.http.get<any>(`${this.apiUrl}?_page=${pagina}&_limit=${limite}`).pipe(
          map(response => {
            return response.data || response || [];
          })
        );
      }

    likedCaes(id: number): Observable<Dog> {
      return this.http.get(`http://localhost:3000/dogs/${id}`).pipe(map((response: any) => {
          return new Dog(response);
      }))
    }

  procurarDog(pesquisa: string, pagina: number, limite: number){
    return this.http.get(`http://localhost:3000/dogs?name_like=${pesquisa}&_page=${pagina}&_limit=${limite}`).pipe(map((response: any) => {
      return response.map((dog: any) => new Dog(dog));
    }))
  }

  procurarDogLetra(pesquisa: string, pagina: number, limite: number){
    return this.http.get(`http://localhost:3000/dogs?name_like=^(${pesquisa}).*&_page=${pagina}&_limit=${limite}`).pipe(map((response: any) => {
      return response.map((dog: any) => new Dog(dog));
    }))
  }

  procurarDogId(id: number): Observable<Dog> {
    return this.http.get(`http://localhost:3000/dogs/${id}`).pipe(map((response: any) => {
        return new Dog(response);
    }))
}
}