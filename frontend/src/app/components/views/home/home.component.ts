import { CarrinhoService } from '../../service/carrinho.service';
import { ProductServiceTotal } from './../../service/productTotal.service';
import { categorias, produtos } from '../../model/model.component';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  produtos: produtos[] = [];
  product: produtos[] = []
  produto: number = 1
  page: number = 0;
  totalProdutos: number = 75
  total: produtos[] = []

  cards: produtos[] = [];
  left: number = 0;
  width: number = 1260;
  categoria: categorias[] = [];
  limite: number = 0
  offsete: number = 0
  color: string = ''

  constructor(public productService: ProductService, public ProductServiceTotal: ProductServiceTotal, private route: ActivatedRoute, public CarrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.getQuantidade();
    this.funcao();
  }

  getQuantidade = () => {
    return this.totalProdutos
  }

  funcao = () => {

    const sort: any = {
      aleatorio: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36]
    }

    const state: any = {
      maxVisibleButtons: 3,
      _pager: 1,
      limit: 16,
      offset: 0,
      limite: 16,
      offsete: sort.aleatorio[Math.floor(Math.random() * sort.aleatorio.length)],
      pageC: 1,
      id: 1,
    };

    const get: any = (): ((data: produtos) => any) => {
      this.productService.getProdutos(listProducts.limit, paginasControl.offset).subscribe((data: produtos) => {
        this.produtos = data['response'].produtos;
      });
      /*this.productService.getProductsid(state.id).subscribe((data: produtos) => {
        this.produtos = data['produtos'];
      });*/
      this.productService.getProdutsCar(state.limite, state.offsete).subscribe((data: produtos) => {
        this.cards = data['response'].produtos;
      });
      return get;
    };

    const get2: any = (): ((data: produtos) => any) => {
      this.ProductServiceTotal.ProductServiceTotal().subscribe((data: produtos) => {
        this.total = data['response'].produtos;
      });
      return get2;
    };

    get2()

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

    const busca: any = (e: Event): void => {
      const target = e.target as HTMLInputElement;
      const busca = target.value;
      this.produtos = this.produtos.filter((produtos) => {
        return produtos.descricao.toLowerCase().includes(busca) || produtos.descricao.toUpperCase().includes(busca) || produtos.categoria.toLocaleUpperCase().includes(busca);
      });
      if (busca == '') {
        get();
      }
    };

    const buscar: any = ($event: { target: categorias; }): void => {
      const target = $event.target as categorias;
      const buscac = target.textContent;
      this.produtos = this.produtos.filter((categoria) => {
        return categoria.categoria.toLocaleUpperCase().includes(buscac);
      });
      if (buscac == '') {
        get();
      }
    };

    const events: any = {
      limit: this.totalProdutos,
      listEventPagination() {
        html.get('.anterior').addEventListener('click', () => {
          paginasControl.prevPage();
        });
        html.get('.proximo').addEventListener('click', () => {
          paginasControl.nextPage();
        });
        html.get('.inicio').addEventListener('click', () => {
          paginasControl.goToPage(1);
        });
        html.get('.final').addEventListener('click', () => {
          paginasControl.goToPage(paginasControl.totalPager - 1);
        });
        html.get('#itensPagina').addEventListener('change', () => {
          listProducts.whenList()
        });
        html.get('#bt-1').addEventListener('click', () => {
          paginasControl.prevPageCar();
        });
        html.get('#bt-4').addEventListener('click', () => {
          paginasControl.nextPageCar();
        });
      },
      listEventBusca() {
        html.get('#busca').addEventListener('keyup', () => {
          listProducts.limit = 62
          buttonsPaginate.update();
        });
        html.get('#busca').addEventListener('keyup', _.debounce(busca, 800));
        html.get('#busca').addEventListener('keyup', get())
        html.get('.atalhos').addEventListener('click', _.debounce(buscar, 800));
        html.get('.atalhos').addEventListener('click', get())
      }
    };

    const paginasControl: any = {
      totalPager: Math.ceil(this.totalProdutos / state.limit) + 1,
      offset: (state._pager - 1) * state.limit,
      _pager: 1,
      pageC: 1,

      get pager() { return this._pager },
      set pager(value) { this._pager = value },

      prevPage() {
        if (this._pager <= 1) {
          ++this._pager
        }
        --this._pager;
        listProducts.prevList()
        console.log(this._pager)
      },
      nextPage() {
        if (this._pager > (this.totalPager - 2)) {
          --this._pager
        }
        ++this._pager;
        listProducts.nextList()
        console.log(this._pager)
      },
      goToPage(_pager: number) {
        this._pager = +_pager
        listProducts.goToList()
        console.log(this._pager)
      },
      prevPageCar() {
        --this.pageC
        listProducts.prevListCar()
        if (this.pageC < 1) {
          ++this.pageC
        }
        console.log(this.pageC)
      },
      nextPageCar() {
        ++this.pageC
        listProducts.nextListCar()
        if (this.pageC > 4) {
          --this.pageC
        }
      }
    }

    const listProducts: any = {
      limit: state.limit,
      totalProdutos: this.totalProdutos,
      first: state.first,

      prevList() {
        if (paginasControl._pager > 0) {
          paginasControl.offset = (paginasControl._pager - 1) * listProducts.limit
          baseBd.up()
          buttonsPaginate.update()
        }
      },
      nextList() {
        if (paginasControl._pager < (paginasControl.totalPager)) {
          paginasControl.offset = (paginasControl._pager - 1) * listProducts.limit
          baseBd.up()
          buttonsPaginate.update()
        }
      },
      goToList(paginasControl_pager: number) {
        if (paginasControl_pager == 1) {
          paginasControl.offset = 0
          baseBd.up()
          buttonsPaginate.update()
        } else if (paginasControl._pager < (paginasControl.totalPager)) {
          paginasControl.offset = ((paginasControl._pager - 1) * listProducts.limit);
          baseBd.up()
          buttonsPaginate.update()
        }
      },
      whenList() {
        const select: any = document.querySelector('#itensPagina');
        const optionValue = select.options[select.selectedIndex];
        listProducts.limit = optionValue.text;
        paginasControl.totalPager = Math.ceil(listProducts.totalProdutos / listProducts.limit) + 1
        baseBd.up()
        buttonsPaginate.update();
        return paginasControl.totalPager
      },
      prevListCar() {
        if (paginasControl.pageC > 0) {
          first()
        }
      },
      nextListCar() {
        if (paginasControl.pageC < 5) {
          second()
        }
      }
    };

    const buttonsPaginate: any = {
      element: html.get('.pagination .numeros'),
      create(number: string) {
        const button = document.createElement('button')
        button.id = 'butto'
        button.innerHTML = number
        button.addEventListener('click', (e: Event) => {
          const target = e.target as Text
          const result = target.textContent
          paginasControl.goToPage(result)
          listProducts.goToList(result)
          baseBd.up()
          this.update()
        })
        buttonsPaginate.element.appendChild(button)
      },
      update() {
        buttonsPaginate.element.innerHTML = ''
        const { maxLeft, maxRight } = buttonsPaginate.calculateMaxVisible()
        for (let pagina = maxLeft; pagina <= maxRight; pagina++) {
          buttonsPaginate.create(pagina)
        }
      },
      calculateMaxVisible() {
        const { maxVisibleButtons } = state;
        if (paginasControl._pager > paginasControl.totalPager) { }
        let maxLeft = (paginasControl._pager - Math.floor(maxVisibleButtons / 2))
        let maxRight = (paginasControl._pager + Math.floor(maxVisibleButtons / 2))
        if (maxLeft < 1) {
          maxLeft = 1,
            maxRight = maxVisibleButtons
        }
        if (maxRight > paginasControl.totalPager - 1) {
          maxLeft = paginasControl.totalPager - (maxVisibleButtons - 1)
          maxRight = paginasControl.totalPager - 1
          if (maxLeft < 1) maxLeft = 1
        }
        return { maxLeft, maxRight }
      }
    }

    const first = () => {
      this.left += 1260;
      this.width -= 1260;
    };

    const second = () => {
      this.left -= 1260;
      this.width += 1260;
    };

    const init = () => {
      buttonsPaginate.update();
      events.listEventPagination();
      events.listEventBusca();
      get();
    };
    init();
  }

  adicionarAoCarrinho: any = (numberId: number) => {
    this.CarrinhoService.adicionarItem(numberId);
  }
}




