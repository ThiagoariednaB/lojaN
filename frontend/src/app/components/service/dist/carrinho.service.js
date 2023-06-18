"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    function CarrinhoService(ProductService) {
        var _this = this;
        this.ProductService = ProductService;
        this.product = [];
        this.obterItens = function (produto) {
            if (produto == 0) {
                _this.product = [];
            }
            else {
                _this.ProductService.getProductsid(produto).subscribe(function (data) {
                    _this.product = data['produtos'];
                });
            }
            return _this.product;
        };
    }
    CarrinhoService.prototype.adicionarItem = function (numberId) {
        var _this = this;
        this.ProductService.getProductsid(numberId).subscribe(function (data) {
            var res = ((data));
            var values = Object.values(res.produtos);
            var i = _this.product.findIndex(function (x) { return x.id_produto == values[0].id_produto; });
            if (i > -1) {
                _this.product[i].quantidade++;
            }
            else {
                _this.product.push(__assign(__assign({}, values[0]), { quantidade: 1 }));
            }
        });
    };
    CarrinhoService.prototype.removerItem = function (index) {
        if (this.product[index].quantidade > 1) {
            this.product[index].quantidade--;
        }
        else {
            this.product.splice(index, 1);
        }
    };
    CarrinhoService.prototype.obterTotalItens = function () {
        return this.product.reduce(function (total, item) { return total + (item.quantidade); }, 0);
    };
    CarrinhoService.prototype.obterTotal = function () {
        return this.product.reduce(function (total, item) { return total + (item.preco * item.quantidade); }, 0);
    };
    CarrinhoService.prototype.limparCarrinho = function () {
        this.product.splice(0, this.product.reduce(function (total, item) { return total + (item.quantidade); }, 0));
    };
    CarrinhoService.prototype.obterFrete = function () {
    };
    CarrinhoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CarrinhoService);
    return CarrinhoService;
}());
exports.CarrinhoService = CarrinhoService;
