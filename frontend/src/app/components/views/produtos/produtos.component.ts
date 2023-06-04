import { categorias, produtos } from '../../model/model.component';
import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { pairwise } from 'rxjs';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export class ProdutosComponent implements OnInit {
  produtos: produtos[] = [];
  produtosT: produtos[] = [];
  page: number = 0;
  totalProdutos: number = 62;


  categoria: categorias[] = [];
  private _pager: number = 0;
  inscricao: any;
  id: any;

  constructor(public productService: ProductService, private route: ActivatedRoute) {
    console.log(route)
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id_produto']
      this.produtos
    })

    /*this.inscricao = this.route.queryParams.subscribe((params: any) => {
      this.id = params['id_produto']
    })*/
    this.getQuantidade();
    this.funcao();
  }

  getQuantidade = () => {
    return this.produtos.length;
  }

  funcao = () => {

    const state: any = {
      id: this.id,
    };


    const get: any = (): ((data: produtos) => any) => {
      this.productService.getProductsid(state.id).subscribe((data: produtos) => {
        this.produtos = data['produtos'];
      });
      return get;
    };

    const html: any = {
      get(element: any) {
        return document.querySelector(element);
      }
    };

    const baseBd: any = {
      create(data: produtos) {
        const div = document.createElement('div');
        div.classList.add('data');
        div.innerHTML = data['response'].produtos
      },
      up() {
        html.get('.produto-single').innerHTML = '';
        html.get('.produto-id').innerHTML = get();
        html.get('.produto-descricao').innerHTML = get();
        html.get('.produto-quantidade').innerHTML = get();
        html.get('.produto-preco').innerHTML = get();
        html.get('.produto-img').innerHTML = get();
      },
    };

    const init = () => {
      get();
    };
    init();
  }
}


