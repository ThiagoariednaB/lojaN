import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { ceps } from '../model/model.component';


@Injectable({
  providedIn: 'root'
})
export class FreteService {

  constructor(private http: HttpClient) { }

  url = `https://viacep.com.br/ws`

  public getFrete(cep: string): Observable<ceps> {
    return this.http.get<ceps>(`${this.url}/${cep}/json`);
  }
}
