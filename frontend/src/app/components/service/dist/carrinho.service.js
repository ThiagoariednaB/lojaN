"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarrinhoService = void 0;
var core_1 = require("@angular/core");
var CarrinhoService = /** @class */ (function () {
    function CarrinhoService(productService) {
        var _this = this;
        this.productService = productService;
        this.produtos = [];
        this.produto = 1;
        this.serviceAdd = function (produto) {
            _this.productService.getProductsid(produto).subscribe(function (resultado) {
                var res = ((resultado));
                var values = Object.values(res.produtos);
                _this.produtos.push(values[0]);
            });
        };
        this.remover = function () {
        };
        this.removerItem = function (index) {
            _this.produtos.splice(index, 1);
        };
        this.obterItens = function () {
            return _this.produtos;
        };
        this.obterTotal = function () {
            return _this.produtos.reduce(function (total, item) { return total + item.preco; }, 0);
        };
        this.limparCarrinho = function () {
            _this.produtos = [];
        };
    }
    CarrinhoService.prototype.ngOnInit = function () {
    };
    CarrinhoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CarrinhoService);
    return CarrinhoService;
}());
exports.CarrinhoService = CarrinhoService;
