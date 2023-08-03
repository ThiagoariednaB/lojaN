import { categorias, produtos } from '../../model/model.component';
import { Component } from '@angular/core';
import * as _ from 'lodash';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../template/header/header.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categorias: categorias[] = []
  width: number = 0
  width5: number = 0;
  zindex: number = 0;

  constructor(public ProductService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categorias = params['response']
    })

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
        html.get('.categorias').addEventListener('click', getCategory());
        html.get('.categorias').addEventListener('click', () => {
          desativa()
        })
      }
    }
    events.ativaEventos()

    const ativa = () => {
      this.width = 300
      this.width5 = 100
      this.zindex = 3
    }

    const desativa = () => {
      this.width = 0
      this.width5 = 0
      this.zindex = 0
    }
  }
}


