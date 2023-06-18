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
  width4: number = 0
  width5: number = 0;
  page: number = 130;
  totalProdutos: number = 62;

  cards: produtos[] = [];
  left: number = 0;
  width: number = 1260;
  categoria: categorias[] = [];
  private _pager: number = 0;
  limite: number = 0
  offsete: number = 0


  constructor(public ProductService: ProductService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getQuantidade();
    this.funcao();
  }

  getQuantidade = () => {
    return this.produtos.length;
  }

  funcao = () => {
    const get: any = (): ((data: categorias) => any) => {
      this.ProductService.getCategory().subscribe((data: categorias) => {
        this.categorias = data['response'].categoria
      });
      return get;
    };

    get();

    const html: any = {
      get(element: any) {
        return document.querySelector(element);
      }
    };

    const events: any = {
      ativaInativaC() {
        html.get('.menuAtivo').addEventListener('click', () => {
          ativa()
        });
        html.get('.menuInativo').addEventListener('click', () => {
          desativa()
        });
        html.get('.atalhosFundo').addEventListener('click', () => {
          desativa()
        });
      }
    }

    const ativa = () => {
      this.width4 = 300
      this.width5 = 100
    }

    const desativa = () => {
      this.width4 = 0
      this.width5 = 0
    }

    events.ativaInativaC()
  }
}


