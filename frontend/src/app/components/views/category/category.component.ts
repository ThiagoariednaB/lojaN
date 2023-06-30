import { categorias, produtos } from '../../model/model.component';
import { Component } from '@angular/core';
import * as _ from 'lodash';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categorias: categorias[] = []
  produtos: produtos[] = []
  width: number = 0

  constructor(public ProductService: ProductService, private route: ActivatedRoute) {  }

  ngOnInit() {
    this.funcao();
  }

  funcao = () => {
    const getCategory: any = (): ((data: categorias) => any) => {
      this.ProductService.getCategory().subscribe((data: categorias) => {
        this.categorias = data['response'].categoria
      });
      return getCategory;
    };

    const html: any = {
      get(element: any) {
        return document.querySelector(element);
      }
    };

    const events: any = {
      ativaEventos() {
        html.get('.menuAtivo').addEventListener('click', () => {
          ativa()
        });
        html.get('.menuInativo').addEventListener('click', () => {
          desativa()
        });
        html.get('.atalhosFundo').addEventListener('click', () => {
          desativa()
        });
        html.get('.categorias').addEventListener('click', getCategory())
      }
    }

    const ativa = () => {
      this.width = 300
    }

    const desativa = () => {
      this.width = 0
    }

    events.ativaEventos()
  }
}


