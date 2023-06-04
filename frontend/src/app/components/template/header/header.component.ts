import { ProductService } from './../../service/product.service';
import { produtos, categorias } from './../../model/model.component';
import { Component, OnInit, Input } from '@angular/core';
import { CarrinhoService } from '../../service/carrinho.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public CarrinhoService: CarrinhoService, public ProductService: ProductService) { }

  ngOnInit(): void {
    this.funcao();
  }

  categorias: categorias[] = []
  produtos: produtos[] = []
  zindexMenuAtivo: number = 5
  zindexMenuInativo: number = 0

  top1: number = 15
  display: string = ''
  top3: number = 30

  transition: number = 0

  transform1: string = ''
  transform3: string = ''

  width1: number = 48
  width3: number = 48

  width4: number = 0
  width5: number = 0

  zindex: number = 0
  fundo: string = '#000'
  opacity: number = 0

  width6: number = 0.2
  backgroundcolor: string = ''
  border: string = '2px solid white'
  color: string = 'white'

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
      ativo() {
        html.get('.menuAtivo').addEventListener('click', () => {
          ativa()
        });
        html.get('#lupas').addEventListener('click', () => {
          ativa2()
        });
      },
      inativo() {
        html.get('.menuInativo').addEventListener('click', () => {
          desativar()
        });
        html.get('.atalhosFundo').addEventListener('click', () => {
          desativar()
        });
        html.get('#lupa').addEventListener('click', () => {
          desativa2()
        });
        html.get('.atalhos').addEventListener('click', () => {
          desativar()
        });
      }
    }

    const ativa = () => {
      this.zindexMenuAtivo = 4
      this.zindexMenuInativo = 5

      this.top1 = 24
      this.display = 'none'
      this.top3 = 21

      this.transition = 0.3

      this.transform1 = 'rotate(45deg)'
      this.transform3 = 'rotate(-45deg)'

      this.width1 = 50
      this.width3 = 50

      this.width4 = 250
      this.width5 = 100

      this.zindex = 3
      this.fundo = '#000'
      this.opacity = 0.2
    };

    const desativar = () => {
      this.zindexMenuAtivo = 5
      this.zindexMenuInativo = 4

      this.top1 = 15
      this.display = 'block'
      this.top3 = 30

      this.transition = 0.3

      this.transform1 = 'rotate(0deg)'
      this.transform3 = 'rotate(-0deg)'

      this.width1 = 48
      this.width3 = 48

      this.width4 = 0
      this.width5 = 0

      this.zindex = 0
      this.fundo = '#000'
      this.opacity = 0
    };

    const ativa2 = () => {
      this.zindexMenuAtivo = 4
      this.zindexMenuInativo = 5
      this.transition = 0.3;

      this.width6 = 28
      this.backgroundcolor = 'rgb(255, 255, 255)';
      this.border = 'transparent';
      this.color = '#000'
    }

    const desativa2 = () => {
      this.zindexMenuAtivo = 5
      this.zindexMenuInativo = 4

      this.width6 = 0.2
      this.backgroundcolor = 'transparent';
      this.transition = 0.3;
      this.border = '2px solid white';
      this.color = 'white'
    }

    events.ativo()
    events.inativo()
  }



}
