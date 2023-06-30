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
var CategoriaComponent = /** @class */ (function () {
    function CategoriaComponent(productService, route, CarrinhoService) {
        var _this = this;
        this.productService = productService;
        this.route = route;
        this.CarrinhoService = CarrinhoService;
        this.produtos = [];
        this.funcao = function () {
            var state = {
                categoria: ''
            };
            _this.route.params.subscribe(function (params) {
                _this.produtos = params['produtos'];
                state.categoria = params['categoria'];
            });
            var getProdC = function () {
                _this.productService.getProductsCat(state.categoria).subscribe(function (data) {
                    _this.produtos = data['produtos'];
                });
                return getProdC;
            };
            getProdC();
            var html = {
                get: function (element) {
                    return document.querySelector(element);
                }
            };
            var events = {
                eventos: function () {
                    html.get('.categorias').addEventListener('click', function () {
                        console.log('click');
                    });
                    html.get('.atalhos').addEventListener('click', getProdC());
                }
            };
        };
        this.adicionarAoCarrinho = function (numberId) {
            _this.CarrinhoService.adicionarItem(numberId);
        };
    }
    CategoriaComponent.prototype.ngOnInit = function () {
        this.funcao();
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
