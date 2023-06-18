"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarrinhoComprasComponent = void 0;
var core_1 = require("@angular/core");
var CarrinhoComprasComponent = /** @class */ (function () {
    function CarrinhoComprasComponent(CarrinhoService, ProductService) {
        var _this = this;
        this.CarrinhoService = CarrinhoService;
        this.ProductService = ProductService;
        this.produtos = [];
        this.width = 300;
        this.width5 = 0;
        this.adicionarAoCarrinho = function (numberId) {
            _this.CarrinhoService.adicionarItem(numberId);
        };
    }
    CarrinhoComprasComponent.prototype.ngOnInit = function () {
        this.funcao3();
        this.produtos = this.CarrinhoService.obterItens(this.produtos);
    };
    CarrinhoComprasComponent.prototype.obterTotalItens = function () {
        return this.CarrinhoService.obterTotalItens();
    };
    CarrinhoComprasComponent.prototype.removerItem = function (index) {
        this.CarrinhoService.removerItem(index);
    };
    CarrinhoComprasComponent.prototype.obterTotal = function () {
        return this.CarrinhoService.obterTotal();
    };
    CarrinhoComprasComponent.prototype.limparCarrinho = function () {
        return this.CarrinhoService.limparCarrinho();
    };
    CarrinhoComprasComponent.prototype.funcao3 = function () {
        var _this = this;
        var html = {
            get: function (element) {
                return document.querySelector(element);
            }
        };
        var events = {
            ativaInativa: function () {
                html.get('.carrinho').addEventListener('click', function () {
                    ativa();
                });
                html.get('.fundo').addEventListener('click', function () {
                    desativa();
                });
            }
        };
        var ativa = function () {
            _this.width = 300;
            _this.width5 = 100;
        };
        var desativa = function () {
            _this.width = 0;
            _this.width5 = 0;
        };
        events.ativaInativa();
    };
    CarrinhoComprasComponent = __decorate([
        core_1.Component({
            selector: 'app-carrinho-compras',
            templateUrl: './carrinho-compras.component.html',
            styleUrls: ['./carrinho-compras.component.css']
        })
    ], CarrinhoComprasComponent);
    return CarrinhoComprasComponent;
}());
exports.CarrinhoComprasComponent = CarrinhoComprasComponent;
