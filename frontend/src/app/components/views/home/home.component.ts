import { categorias, produtos } from '../../model/model.component';
import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { pairwise } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  produtos: produtos[] = [];
  produtosT: produtos[] = [];
  page: number = 0;
  totalProdutos: number = 62;

  cards: produtos[] = [];
  left: number = 0;
  width: number = 1260;
  categoria: categorias[] = [];
  private _pager: number = 0;
  limite: number = 0
  offsete: number = 0

  constructor(public productService: ProductService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getQuantidade();
    this.funcao();
  }

  getQuantidade = () => {
    return this.produtos.length;
  }

  funcao = () => {

    const sort: any = {
      aleatorio: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36]
    }

    const state: any = {
      maxVisibleButtons: 3,
      limit: 15,
      offset: 0,
      limite: 4,
      offsete: sort.aleatorio[Math.floor(Math.random() * sort.aleatorio.length)],
      pageC: 1,
    };

    const get: any = (): ((data: produtos) => any) => {
      /*this.productService.getProdutoT().subscribe((data: produtos) => {
        this.produtosT = data['response'].produtos;
      });*/
      this.productService.getProdutos(listProducts.limit, paginasControl.offset).subscribe((data: produtos) => {
        this.produtos = data['response'].produtos;
      });
      this.productService.getProdutsCar(state.limite, state.offsete).subscribe((data: produtos) => {
        this.cards = data['response'].produtos;
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
      console.log(buscac)
      this.produtos = this.produtos.filter((categoria) => {
        return categoria.categoria.toLocaleUpperCase().includes(buscac);
      });
      if (buscac == '') {
        get();
      }
    };


    const events: any = {
      listEventPagination() {
        html.get('.inicio').addEventListener('click', () => {
          buttonsPaginate.update()
          paginasControl.goToPage(1);
          listProducts.initList()
        });
        html.get('.final').addEventListener('click', () => {
          buttonsPaginate.update()
          paginasControl.goToPage(paginasControl.totalPager);
          listProducts.finalList();
        });
        html.get('.anterior').addEventListener('click', () => {
          buttonsPaginate.update()
          paginasControl.prevPage();
        });
        html.get('.proximo').addEventListener('click', () => {
          buttonsPaginate.update()
          paginasControl.nextPage();
        });
        html.get('#itensPagina').addEventListener('change', () => {
          listProducts.whenList();
          buttonsPaginate.updade()
        });
        html.get('#bt-1').addEventListener('click', () => {
          paginasControl.prevPageCar();
        });
        html.get('#bt-4').addEventListener('click', () => {
          paginasControl.nextPageCar();
        });

      },
      listEventBusca() {
        html.get('#busca').addEventListener('keyup', _.debounce(busca, 800));
        html.get('#busca').addEventListener('keyup', get())
        html.get('.atalhos').addEventListener('click', _.debounce(buscar, 800));
        html.get('.atalhos').addEventListener('click', get())
      }
    };

    const paginasControl: any = {
      totalPager: Math.ceil(this.totalProdutos / state.limit) + 1,
      offset: (this._pager) * state.limit,
      _pager: 1,
      pageC: 1,

      get pager() { return this._pager },
      set pager(value) { this._pager = value },

      prevPage() {
        --this._pager;
        listProducts.prevList()
        if (this._pager < 1) {
          ++this._pager
        }
        buttonsPaginate.update()
      },
      nextPage() {
        ++this._pager;
        listProducts.nextList()
        if (this._pager > (this.totalPager - 1)) {
          --this._pager
        }
        buttonsPaginate.update()
      },
      goToPage(_pager: number) {
        if (this._pager < 1) {
          ++this._pager
        }
        this._pager = +_pager
        if (this._pager > paginasControl.totalPager - 1) {
          --this._pager
        }
        buttonsPaginate.update()
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
        }
      },
      nextList() {
        if (paginasControl._pager < (paginasControl.totalPager)) {
          paginasControl.offset = (paginasControl._pager - 1) * listProducts.limit
          baseBd.up()
        }
      },
      initList() {
        if (paginasControl._pager > 0) {
          paginasControl.offset = 0
          baseBd.up()
        }
      },
      finalList() {
        if (paginasControl._pager < (paginasControl.totalPager + 1)) {
          paginasControl.offset = (listProducts.limit * paginasControl.totalPager) - (listProducts.limit * 2)
          baseBd.up()
        }
      },
      goToList(pager: number) {
        if (pager < 1) {
          pager++;
        }
        if (pager == 1) {
          paginasControl.offset = (paginasControl._pager - 1) * listProducts.limit
        } else if (pager < (paginasControl.totalPager)) {
          paginasControl.offset = ((pager - 1) * listProducts.limit);
          baseBd.up()
        }
        if (pager > paginasControl.totalPager) {
          pager--;
        }
      },
      whenList() {
        const select: any = document.querySelector('#itensPagina');
        const optionValue = select.options[select.selectedIndex];
        listProducts.limit = optionValue.text;
        paginasControl.totalPager = Math.ceil(listProducts.totalProdutos / listProducts.limit) + 1
        buttonsPaginate.update();
        baseBd.up()
        return paginasControl.totalPager
      },
      prevListCar() {
        if (paginasControl.pageC > 0) {
          first()
          setTimeout(function () {
            state.limite -= 4
            baseBd.up()
          }, 3300)
        }
      },
      nextListCar() {
        if (paginasControl.pageC < 5) {
          setTimeout(function () {
            second()
          }, 200)
          state.limite += 4
          baseBd.up()
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
}


