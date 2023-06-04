import { categorias, produtos } from '../model/model.component';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  SERVER_URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  public getProdutos(itemsPerPager: number, first: number): Observable<produtos> {
    return this.http.get<produtos>(`${this.SERVER_URL}/produtos?limit=${itemsPerPager}&offset=${first}`)
  }

  public getProdutsCar(itemsPerPager: number, first: number): Observable<produtos> {
    return this.http.get<produtos>(`${this.SERVER_URL}/produtos?limit=${itemsPerPager}&offset=${first}`)
  }

  public getProductsid(id: number): Observable<produtos> {
    return this.http.get<produtos>(`${this.SERVER_URL}/produtos/${id}`)
  }

  public getCategory(): Observable<categorias> {
    return this.http.get<categorias>(`${this.SERVER_URL}/categorias`)
  }
}
