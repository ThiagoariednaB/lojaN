import { Injectable } from '@angular/core';
import { produtos } from '../model/model.component';
import { ProductService } from '../service/product.service';
import { forEach } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  public product: produtos[] = [];

  constructor(public ProductService: ProductService) { }

  adicionarItem(numberId: number) {
    this.ProductService.getProductsid(numberId).subscribe((data: produtos) => {
      const res = ((data));
      const values: any = Object.values(res.produtos)
      let i = this.product.findIndex((produto) => produto.id_produto == values[0].id_produto);
      if (i > -1) {
        this.product[i].quantidade++;
      } else {
        this.product.push({ ...values[0], quantidade: 1 });
      }
    })
  }

  removerItem(index: number) {
    if (this.product[index].quantidade > 1) {
      this.product[index].quantidade--
    } else {
      this.product.splice(index, 1)
    }
  }

  obterItens: any = (produto: number) => {
    if (produto == 0) {
      this.product = []
    } else {
      this.ProductService.getProductsid(produto).subscribe((data: produtos) => {
        this.product = data['produtos'];
      })
    }
    return this.product;
  }

  obterTotalItens() {
    return this.product.reduce((total, item) => total + (item.quantidade), 0);
  }

  obterTotal() {
    return this.product.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  }

  limparCarrinho() {
    this.product.splice(0, this.product.reduce((total, item) => total + (item.quantidade), 0))
  }

  obterFrete() {

  }
}
