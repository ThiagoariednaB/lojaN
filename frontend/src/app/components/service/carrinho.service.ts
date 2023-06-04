import { ShopComponent } from './../views/shop/shop.component';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { produtos } from '../model/model.component';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})

export class CarrinhoService implements OnInit {
  produtos: produtos[] = [];
  produto: number = 1

  constructor(public productService: ProductService ) { }

  ngOnInit(): void {
    
  }



  serviceAdd: any = (produto: number) => {
    this.productService.getProductsid(produto).subscribe(resultado => {
      const res = ((resultado));
      const values: any = Object.values(res.produtos);
      this.produtos.push(values[0]);
    });
  }

  remover: any = () => {

  }

  removerItem: any = (index: number) => {
    this.produtos.splice(index, 1);
  }

  obterItens: any = () => {
    return this.produtos;
  }

  obterTotal: any = () => {
    return this.produtos.reduce((total, item) => total + item.preco, 0);
  }

  limparCarrinho: any = () => {
    this.produtos = [];
  }


}
