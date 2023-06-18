import { ProductService } from './../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../../service/carrinho.service';
import { produtos } from '../../model/model.component';


@Component({
  selector: 'app-carrinho-compras',
  templateUrl: './carrinho-compras.component.html',
  styleUrls: ['./carrinho-compras.component.css']
})
export class CarrinhoComprasComponent implements OnInit {
  produtos: produtos[] = []
  width: number = 300
  width5: number = 0

  constructor(private CarrinhoService: CarrinhoService, public ProductService: ProductService) { }

  ngOnInit() {
    this.funcao3()
    this.produtos = this.CarrinhoService.obterItens(this.produtos);
  }

  obterTotalItens() {
    return this.CarrinhoService.obterTotalItens()
  }

  removerItem(index: number) {
    this.CarrinhoService.removerItem(index);
  }

  obterTotal() {
    return this.CarrinhoService.obterTotal();
  }

  limparCarrinho() {
    return this.CarrinhoService.limparCarrinho()
  }

  funcao3(){
    const html: any = {
      get(element: any) {
        return document.querySelector(element);
      }
    }

    const events: any = {
      ativaInativa() {
        html.get('.carrinho').addEventListener('click', () => {
          ativa()
        });
        html.get('.fundo').addEventListener('click', () => {
          desativa()
        });
      }
    }

    const ativa = () => {
      this.width = 300
      this.width5 = 100
    }

    const desativa = () => {
      this.width = 0
      this.width5 = 0
    }

    events.ativaInativa()
  }

  adicionarAoCarrinho: any = (numberId: number) => {
    this.CarrinhoService.adicionarItem(numberId);
  }
}
