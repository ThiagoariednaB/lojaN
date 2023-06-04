import { categorias, produtos } from '../model/model.component';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})

export class ProductServiceTotal {

  SERVER_URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  public ProductServiceTotal(): Observable<produtos> {
    return this.http.get<produtos>(`${this.SERVER_URL}/produtostotal`)
  }
}
