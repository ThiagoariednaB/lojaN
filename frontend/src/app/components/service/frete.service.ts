import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { frete } from '../model/model.component';


@Injectable({
  providedIn: 'root'
})
export class FreteService {

  constructor(private http: HttpClient) { }

  url = `https://api.correios.com.br/token/v1/autentica`

  public getFrete(cep: string): Observable<frete> {
    return this.http.get<frete>(`${this.url}/${cep}`);
  }
}
