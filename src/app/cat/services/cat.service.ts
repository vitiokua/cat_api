import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BreedModel, CatModel} from "../cat.model";

@Injectable({
  providedIn: 'root'
})
export class CatService {
  constructor(private http: HttpClient) { }

  api = 'https://api.thecatapi.com/v1/'

  getCats(breed_id: string): Observable<CatModel[]>{
    const params = {
      breed_ids: breed_id,
      limit: 10
    }
    return this.http.get<CatModel[]>(this.api + `images/search`,{params})
  }

  getBreeds(): Observable<BreedModel[]>{
    return this.http.get<BreedModel[]>(this.api + `breeds`)
  }
}
