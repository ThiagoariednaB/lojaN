import { categorias } from './../../model/model.component';
import { CarrinhoService } from './../../service/carrinho.service';
import { Component } from '@angular/core';
import { produtos } from '../../model/model.component';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  produtos: produtos[] = [];

  constructor(public productService: ProductService, private route: ActivatedRoute, private CarrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.funcao();
  }

  funcao = () => {
    const state: any = {
      categoria: ''
    };

    this.route.params.subscribe(params => {
      this.produtos = params['produtos']
      state.categoria = params['categoria']
    })

    const getProdC: any = (): ((data: produtos) => any) => {
      this.productService.getProductsCat( state.categoria ).subscribe((data: produtos) => {
        this.produtos = data['produtos'];
      });
      return getProdC;
    };

    getProdC()

    const html: any = {
      get(element: any) {
        return document.querySelector(element);
      }
    };

    const events: any = {
      eventos() {
        html.get('.categorias').addEventListener('click', () => {
          console.log('click')
        });
        html.get('.atalhos').addEventListener('click', getProdC())
      }
    }
  }

  adicionarAoCarrinho: any = (numberId: number) => {
    this.CarrinhoService.adicionarItem(numberId);
  }
}
