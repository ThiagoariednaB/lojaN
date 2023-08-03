import { HomeComponent } from './../../views/home/home.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  totalProdutos: number = 75

  constructor() { }

  ngOnInit(): void {
    this.getQuantidade();
  }

  getQuantidade = () => {
    return this.totalProdutos
  }
}
