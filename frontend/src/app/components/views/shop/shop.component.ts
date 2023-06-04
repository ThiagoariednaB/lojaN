import { HomeComponent } from './../home/home.component';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../service/product.service';
import { CarrinhoService } from '../../service/carrinho.service'
import { produtos } from '../../model/model.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  providers: [CarrinhoService]
})
export class ShopComponent implements OnInit {

  constructor(public ProductService: ProductService, public CarrinhoService: CarrinhoService) { }

  ngOnInit() {
  }

  produtos: produtos[] = []
  produto: number = 1

  funcao2 = () => {
    const get: any = (): ((data: produtos) => any) => {
      this.ProductService.getProductsid(this.produto).subscribe((data: produtos) => {
        this.produtos = data['produtos'];
      });
      return get;
    };
    get()
    return this.funcao2
  }

  shopAdd: any = (produto: number) => {
    this.ProductService.getProductsid(produto).subscribe(resultado => {
      const res = ((resultado));
      const values: any = Object.values(res.produtos);
      this.produtos.push(values[0]);
    });
    return this.shopAdd
  }

  remover: any = (produto: number) => {

  }

}
