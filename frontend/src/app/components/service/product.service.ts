import { produtos } from '../model/model.component';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  produto: produtos[] = []

  SERVER_URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<produtos> {
    return this.http.get<produtos>(`${this.SERVER_URL}/produtos`)
  }

  public getProductsid(id: number): Observable<produtos> {
    return this.http.get<produtos>(`${this.SERVER_URL}/produtos/${id}`)
  }
}
