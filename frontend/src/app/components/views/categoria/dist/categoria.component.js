"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoriaComponent = void 0;
var core_1 = require("@angular/core");
var _ = require("lodash");
var CategoriaComponent = /** @class */ (function () {
    function CategoriaComponent(productService, route, CarrinhoService) {
        var _this = this;
        this.productService = productService;
        this.route = route;
        this.CarrinhoService = CarrinhoService;
        this.produtos = [];
        this.totalProdutos = 75;
        this.left = 0;
        this.width = 0;
        this.product = [];
        this.produto = 1;
        this.page = 0;
        this.total = [];
        this.getQuantidade = function () {
            return _this.totalProdutos;
        };
        this.funcaoHome = function () {
            var state = {
                categoria: '',
                maxVisibleButtons: 3,
                _pager: 1,
                limit: 16,
                offset: 0,
                pageC: 1,
                id: 1
            };
            _this.route.params.subscribe(function (params) {
                state.categoria = params['categoria'];
                //this.produtos = params['produtos']
            });
            var get = function () {
                _this.productService.getProductsCat(state.categoria).subscribe(function (data) {
                    _this.produtos = data['produtos'];
                });
                _this.productService.getProdutos(listProducts.limit, paginasControl.offset).subscribe(function (data) {
                    _this.produtos = data['response'].produtos;
                });
                return get;
            };
            var html = {
                get: function (element) {
                    return document.querySelector(element);
                }
            };
            var baseBd = {
                create: function (data) {
                    var div = document.createElement('div');
                    div.classList.add('data');
                    div.innerHTML = data['response'].produtos;
                },
                up: function () {
                    html.get('.produto-single').innerHTML = '';
                    html.get('.produto-id').innerHTML = get();
                    html.get('.produto-descricao').innerHTML = get();
                    html.get('.produto-quantidade').innerHTML = get();
                    html.get('.produto-preco').innerHTML = get();
                    html.get('.produto-img').innerHTML = get();
                }
            };
            var busca = function (e) {
                var target = e.target;
                var busca = target.value;
                _this.produtos = _this.produtos.filter(function (produtos) {
                    return produtos.descricao.toLowerCase().includes(busca) || produtos.descricao.toUpperCase().includes(busca) || produtos.categoria.toLocaleUpperCase().includes(busca);
                });
                if (busca == '') {
                    get();
                }
            };
            var events = {
                limit: _this.totalProdutos,
                listEventPagination: function () {
                    html.get('.anterior').addEventListener('click', function () {
                        paginasControl.prevPage();
                    });
                    html.get('.proximo').addEventListener('click', function () {
                        paginasControl.nextPage();
                    });
                    html.get('.inicio').addEventListener('click', function () {
                        paginasControl.goToPage(1);
                    });
                    html.get('.final').addEventListener('click', function () {
                        paginasControl.goToPage(paginasControl.totalPager - 1);
                    });
                    html.get('#itensPagina').addEventListener('change', function () {
                        listProducts.whenList();
                    });
                    html.get('#bt-1').addEventListener('click', function () {
                        paginasControl.prevPageCar();
                    });
                    html.get('#bt-4').addEventListener('click', function () {
                        paginasControl.nextPageCar();
                    });
                    html.get('.categorias').addEventListener('click', get());
                },
                listEventBusca: function () {
                    html.get('#busca').addEventListener('keyup', function () {
                        listProducts.limit = 62;
                        buttonsPaginate.update();
                    });
                    html.get('#busca').addEventListener('keyup', _.debounce(busca, 800));
                    html.get('#busca').addEventListener('keyup', get());
                }
            };
            var paginasControl = {
                totalPager: Math.ceil(_this.totalProdutos / state.limit) + 1,
                offset: (state._pager - 1) * state.limit,
                _pager: 1,
                pageC: 1,
                get pager() { return this._pager; },
                set pager(value) { this._pager = value; },
                prevPage: function () {
                    if (this._pager <= 1) {
                        ++this._pager;
                    }
                    --this._pager;
                    listProducts.prevList();
                    console.log(this._pager);
                },
                nextPage: function () {
                    if (this._pager > (this.totalPager - 2)) {
                        --this._pager;
                    }
                    ++this._pager;
                    listProducts.nextList();
                    console.log(this._pager);
                },
                goToPage: function (_pager) {
                    this._pager = +_pager;
                    listProducts.goToList();
                    console.log(this._pager);
                },
                prevPageCar: function () {
                    --this.pageC;
                    listProducts.prevListCar();
                    if (this.pageC < 1) {
                        ++this.pageC;
                    }
                    console.log(this.pageC);
                },
                nextPageCar: function () {
                    ++this.pageC;
                    listProducts.nextListCar();
                    if (this.pageC > 4) {
                        --this.pageC;
                    }
                }
            };
            var listProducts = {
                limit: state.limit,
                totalProdutos: _this.totalProdutos,
                first: state.first,
                prevList: function () {
                    if (paginasControl._pager > 0) {
                        paginasControl.offset = (paginasControl._pager - 1) * listProducts.limit;
                        baseBd.up();
                        buttonsPaginate.update();
                    }
                },
                nextList: function () {
                    if (paginasControl._pager < (paginasControl.totalPager)) {
                        paginasControl.offset = (paginasControl._pager - 1) * listProducts.limit;
                        baseBd.up();
                        buttonsPaginate.update();
                    }
                },
                goToList: function (paginasControl_pager) {
                    if (paginasControl_pager == 1) {
                        paginasControl.offset = 0;
                        baseBd.up();
                        buttonsPaginate.update();
                    }
                    else if (paginasControl._pager < (paginasControl.totalPager)) {
                        paginasControl.offset = ((paginasControl._pager - 1) * listProducts.limit);
                        baseBd.up();
                        buttonsPaginate.update();
                    }
                },
                whenList: function () {
                    var select = document.querySelector('#itensPagina');
                    var optionValue = select.options[select.selectedIndex];
                    listProducts.limit = optionValue.text;
                    paginasControl.totalPager = Math.ceil(listProducts.totalProdutos / listProducts.limit) + 1;
                    baseBd.up();
                    buttonsPaginate.update();
                    return paginasControl.totalPager;
                },
                prevListCar: function () {
                    if (paginasControl.pageC > 0) {
                        first();
                    }
                },
                nextListCar: function () {
                    if (paginasControl.pageC < 5) {
                        second();
                    }
                }
            };
            var buttonsPaginate = {
                element: html.get('.pagination .numeros'),
                create: function (number) {
                    var _this = this;
                    var button = document.createElement('button');
                    button.id = 'butto';
                    button.innerHTML = number;
                    button.addEventListener('click', function (e) {
                        var target = e.target;
                        var result = target.textContent;
                        paginasControl.goToPage(result);
                        listProducts.goToList(result);
                        baseBd.up();
                        _this.update();
                    });
                    buttonsPaginate.element.appendChild(button);
                },
                update: function () {
                    buttonsPaginate.element.innerHTML = '';
                    var _a = buttonsPaginate.calculateMaxVisible(), maxLeft = _a.maxLeft, maxRight = _a.maxRight;
                    for (var pagina = maxLeft; pagina <= maxRight; pagina++) {
                        buttonsPaginate.create(pagina);
                    }
                },
                calculateMaxVisible: function () {
                    var maxVisibleButtons = state.maxVisibleButtons;
                    if (paginasControl._pager > paginasControl.totalPager) { }
                    var maxLeft = (paginasControl._pager - Math.floor(maxVisibleButtons / 2));
                    var maxRight = (paginasControl._pager + Math.floor(maxVisibleButtons / 2));
                    if (maxLeft < 1) {
                        maxLeft = 1,
                            maxRight = maxVisibleButtons;
                    }
                    if (maxRight > paginasControl.totalPager - 1) {
                        maxLeft = paginasControl.totalPager - (maxVisibleButtons - 1);
                        maxRight = paginasControl.totalPager - 1;
                        if (maxLeft < 1)
                            maxLeft = 1;
                    }
                    return { maxLeft: maxLeft, maxRight: maxRight };
                }
            };
            var first = function () {
                _this.left += 1260;
                _this.width -= 1260;
            };
            var second = function () {
                _this.left -= 1260;
                _this.width += 1260;
            };
            buttonsPaginate.update();
            events.listEventPagination();
            events.listEventBusca();
            get();
        };
        this.adicionarAoCarrinho = function (numberId) {
            _this.CarrinhoService.adicionarItem(numberId);
        };
    }
    CategoriaComponent.prototype.ngOnInit = function () {
        this.funcaoHome();
    };
    CategoriaComponent = __decorate([
        core_1.Component({
            selector: 'app-categoria',
            templateUrl: './categoria.component.html',
            styleUrls: ['./categoria.component.css']
        })
    ], CategoriaComponent);
    return CategoriaComponent;
}());
exports.CategoriaComponent = CategoriaComponent;
