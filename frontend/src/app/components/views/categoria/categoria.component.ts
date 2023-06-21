import { CarrinhoService } from './../../service/carrinho.service';
import { Component } from '@angular/core';
import { categorias, produtos } from '../../model/model.component';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { ProductService } from '../../service/product.service';
import { CarrinhoComprasComponent } from '../carrinho-compras/carrinho-compras.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  produtos: produtos[] = [];
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
  ProductService: any;
  categorias: any;

  constructor(public productService: ProductService, private route: ActivatedRoute, private CarrinhoService: CarrinhoService ) { }

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
      this.productService.getProdutos(state.limit=10, state.offset=1).subscribe((data: produtos) => {
        this.produtos = data['response'].produtos;
      });
      return get;
    };

    get()


    const getCategory: any = (): ((data: categorias) => any) => {
      this.ProductService.getCategory().subscribe((data: categorias) => {
        this.categorias = data['response'].categoria
      });
      return getCategory;
    };

    getCategory();

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
        html.get('.atalhos').addEventListener('click', _.debounce(busca, 800));
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
