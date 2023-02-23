import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { produtos } from '../../model/model.component';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  produtos: produtos[] = [];
  cards: produtos[] = [];
  quantidade: produtos[] = [];
  produto: produtos[] = [];
  car: produtos[] = [];
  produtoid: produtos[] = []

  pagina: number = 0;
  paginaCarrossel: number = 0;
  left: number = 0;
  width: number = 1260;

  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.getQuantidade();
    this.funcao();
  }

  getQuantidade = () => {
    return this.produtos.length;
  }

  adicionar = ($event: any) => {
    const target = $event.target as produtos
    const id = target.textContent
    this.car = id
    console.log('adicionado ao carrinho:' +
      '\nid: ' + this.produto[id].id_produto +
      '\ndescrição: ' + this.produto[id].descricao +
      '\nquantidade: ' + this.produto[id].quantidade++ +
      '\npreço: ' + this.produto[id].preco +
      '\nimagem: ' + this.produto[id].produto_imagem)
  }

  remover($event: any): void {
    const target = $event.target as produtos
    const id = target.textContent
    console.log('removido do carrinho:' +
      '\nid: ' + this.produto[id].id_produto +
      '\ndescrição: ' + this.produto[id].descricao +
      '\nquantidade: ' + this.produto[id].quantidade-- +
      '\npreço: ' + this.produto[id].preco +
      '\nimagem: ' + this.produto[id].produto_imagem)
      //console.log(this.produto)
  }

  funcao = () => {
    /*-----------------------------------------------------------------------ESTADOS INICIAL DAS PAGINAS AO SEREM CRIADAS------------------------------------------------------*/
    const state: any = {
      pagina: 1,
      itensPerPage: 12,
      totalDePaginas: Math.ceil(100 / 12),
      maxVisibleButtons: 5,
      totalProdutos: 100,


      paginaCarrossel: 1,
      itensPerPageCarrossel: 4,
      totalDePaginasCarrossel: Math.ceil(16 / 4),
    };

    /*-----------------------------------------------------------------------FAZ UM GET NO BANCO DE DADOS----------------------------------------------------------------------*/
    const get: any = (): ((data: produtos) => any) => {
      this.productService.getProducts().subscribe((data: produtos) => {
        this.produtos = data['response'].produtos.slice(listProducts.start, listProducts.end);
        this.produto = data['response'].produtos
        this.produtoid= data['response'].produtos
        this.cards = data['response'].produtos.slice(listProducts.startCarrossel1, listProducts.endCarrossel1);
      });
      return get;
    };

    /*-----------------------------------------------------------------------CAPTURA OS ELEMENTOS DA DOM-----------------------------------------------------------------------*/
    const html: any = {
      get(element: any) {
        return document.querySelector(element);
      }
    };

    /*-----------------------------------------------------------------------CARREGA OS ELEMENTOS NA DOM-----------------------------------------------------------------------*/
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

    /*-----------------------------------------------------------------------FAZ UMA BUSCA NOS PRODUTOS CARREGADOS NA PAGINAÇÃO EM TODAS AS ABAS-------------------------------*/
    const busca: any = (e: Event): void => {
      const target = e.target as HTMLInputElement;
      const busca = target.value;
      this.produtos = this.produto.filter((produto) => {
        return produto.descricao.toLowerCase().includes(busca) || produto.descricao.toUpperCase().includes(busca);
      });
      if (busca == '') {
        get();
      }
    };

    /*-----------------------------------------------------------------------1 ESCUTA E CRIA OS EVENTOS-----------------------------------------------------------------------------------*/
    const events: any = {
      listEventPagination() {
        html.get('.inicio').addEventListener('click', () => {
          paginasControl.goToPage(1);
          listProducts.initList();
          baseBd.up();
        });
        html.get('.final').addEventListener('click', () => {
          paginasControl.goToPage(state.totalDePaginas);
          listProducts.finalList();
          baseBd.up();
        });
        html.get('.anterior').addEventListener('click', () => {
          paginasControl.prevPage();
        });
        html.get('.proximo').addEventListener('click', () => {
          paginasControl.nextPage();
        });
        html.get('#bt-1').addEventListener('click', () => {
          paginasControl.prevPageCar();
          baseBd.up();
        });
        html.get('#bt-4').addEventListener('click', () => {
          paginasControl.nextPageCar();
          baseBd.up();
        });

        html.get('#itensPagina').addEventListener('change', () => {
          listProducts.whenList();
          baseBd.up();
        });
      },
      listEventBusca() {
        html.get('#busca').addEventListener('keyup', _.debounce(busca, 800));
        html.get('#busca').addEventListener('keyup', get())
      }
    };

    /*-----------------------------------------------------------------------APOS O EVENTO FAZ O CONTROLE DO NUMERO DA PAGINA-----------------------------------------------------------------------*/
    const paginasControl: any = {
      _pagina: 1,
      get pagina() {
        return this._pagina;
      },
      set pagina(value) {
        this._pagina = value;
      },
      prevPage() {
        listProducts.prevList();
        baseBd.up();
        state.pagina--;
        this.pagina--;
        buttonsPaginate.update()
        if (state.pagina < 1) {
          state.pagina++;
          this.pagina++;
        }
      },
      nextPage() {
        listProducts.nextList();
        baseBd.up()
        state.pagina++;
        this.pagina++;
        buttonsPaginate.update()
        if (state.pagina > state.totalDePaginas) {
          state.pagina--;
          this.pagina--;
        }
      },
      goToPage(pagina: number) {
        if (pagina < 0) {
          state.pagina++;
          this.pagina++;
        }

        state.pagina = +pagina;
        this.pagina = +pagina;
        buttonsPaginate.update()

        if (pagina > state.totalDePaginas) {
          state.pagina--;
          this.pagina--;
        }
      },
      prevPageCar() {
        if (state.paginaCarrossel > 1) {
          state.paginaCarrossel--;
          first();
          listProducts.prevListCar()
        } else if (state.paginaCarrossel < 1) {
          state.paginaCarrossel++;
        }
        console.log('pagina anterior: ' + state.paginaCarrossel)
      },
      nextPageCar() {
        if (state.paginaCarrossel < state.totalDePaginasCarrossel) {
          state.paginaCarrossel++;
          second();
          listProducts.nextListCar()
        } else if (state.paginaCarrossel > state.totalDePaginasCarrossel) {
          state.paginaCarrossel--;
        }
        console.log('pagina proxima: ' + state.paginaCarrossel)
      }
    };

    /*-----------------------------------------------------------------------CRIA A LISTA DE COMANDO PARA ATUALIZAR AS PAGINAS----------------------------------------------*/
    const listProducts: any = {
      pagina: state.pagina,
      start: this.pagina * state.itensPerPage,
      end: state.itensPerPage,

      paginaCarrossel: state.paginaCarrossel,
      startCarrossel1: this.paginaCarrossel * state.itensPerPageCarrossel,
      endCarrossel1: state.itensPerPageCarrossel,

      prevList() {
        if (state.pagina > 1) {
          this.start = this.start - state.itensPerPage;
          this.end = this.start + state.itensPerPage;
        }
      },
      nextList() {
        if (state.pagina < state.totalDePaginas) {
          this.start = this.start + state.itensPerPage;
          this.end = this.start + state.itensPerPage;
        }
      },
      initList() {
        if (state.pagina > 0) {
          this.start = listProducts.start - listProducts.start;
          this.end = this.start + state.itensPerPage;
        }
      },
      finalList() {
        if (state.pagina <= state.totalDePaginas) {
          this.start = state.itensPerPage * (state.totalDePaginas - 1);
          this.end = this.start + state.itensPerPage;
        }
      },
      goToList(pagina: number) {
        if (pagina < 0) {
          pagina++;
        }
        if (pagina == 1) {
          this.start = (pagina * 0);
          this.end = this.start + state.itensPerPage;
        } else if (pagina < (state.totalDePaginas) + 1) {
          this.start = ((pagina - 1) * state.itensPerPage);
          this.end = this.start + state.itensPerPage;
        }
        if (pagina > state.totalDePaginas) {
          pagina--;
        }
      },
      prevListCar() {
        if (state.paginaCarrossel > 0) {
          this.startCarrossel1 = 0;
          this.endCarrossel1 = this.endCarrossel1 += state.itensPerPageCarrossel;
        }
      },
      nextListCar() {
        if (state.paginaCarrossel < (state.totalDePaginasCarrossel) + 1) {
          this.startCarrossel1 = 0;
          this.endCarrossel1 = state.itensPerPageCarrossel += state.itensPerPageCarrossel;
        }
      },
      whenList() {
        const select: any = document.querySelector('#itensPagina');
        const optionValue = select.options[select.selectedIndex];
        state.itensPerPage = optionValue.text;
        this.start = 0;
        this.end = this.start + state.itensPerPage;
        state.totalDePaginas = Math.ceil(100 / state.itensPerPage)
        baseBd.up()
        buttonsPaginate.update();
        return state.totalDePaginas
      }
    };

    /*-----------------------------------------------------------------------CRIA OS BOTOES DE NAVEGAÇÃO NAS PAGINAS----------------------------------------------*/
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
        let maxLeft = (paginasControl.pagina - Math.floor(maxVisibleButtons / 2))
        let maxRight = (paginasControl.pagina + Math.floor(maxVisibleButtons / 2))
        if (maxLeft < 1) {
          maxLeft = 1,
            maxRight = maxVisibleButtons
        }
        if (maxRight > state.totalDePaginas) {
          maxLeft = state.totalDePaginas - (maxVisibleButtons - 1)
          maxRight = state.totalDePaginas
          if (maxLeft < 1) maxLeft = 1
        }
        return { maxLeft, maxRight }
      }
    }


    /*-----------------------------------------------------------------------FAZ O INCREMENTO DE DECREMENTO NOS SLIDES DO CARROSSEL--------------------------------------------*/

    const first = () => {
      this.left += 1260;
      this.width -= 1260;
    };

    const second = () => {
      this.left -= 1260;
      this.width += 1260;
    };



    /*-----------------------------------------------------------------------INICIA OS EVENTOS E OS GETs-----------------------------------------------------------------------*/
    const init = () => {
      buttonsPaginate.update();
      events.listEventPagination();
      events.listEventBusca();
      get();
    };
    init();
  }
}
