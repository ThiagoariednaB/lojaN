"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoryComponent = void 0;
var core_1 = require("@angular/core");
var CategoryComponent = /** @class */ (function () {
    function CategoryComponent(ProductService, route) {
        var _this = this;
        this.ProductService = ProductService;
        this.route = route;
        this.categorias = [];
        this.produtos = [];
        this.width4 = 0;
        this.width5 = 0;
        this.page = 130;
        this.totalProdutos = 62;
        this.cards = [];
        this.left = 0;
        this.width = 1260;
        this.categoria = [];
        this._pager = 0;
        this.limite = 0;
        this.offsete = 0;
        this.getQuantidade = function () {
            return _this.produtos.length;
        };
        this.funcao = function () {
            var getCategory = function () {
                _this.ProductService.getCategory().subscribe(function (data) {
                    _this.categorias = data['response'].categoria;
                });
                return getCategory;
            };
            getCategory();
            var html = {
                get: function (element) {
                    return document.querySelector(element);
                }
            };
            var events = {
                ativaInativaC: function () {
                    html.get('.menuAtivo').addEventListener('click', function () {
                        ativa();
                    });
                    html.get('.menuInativo').addEventListener('click', function () {
                        desativa();
                    });
                    html.get('.atalhosFundo').addEventListener('click', function () {
                        desativa();
                    });
                }
            };
            var ativa = function () {
                _this.width4 = 300;
                _this.width5 = 100;
            };
            var desativa = function () {
                _this.width4 = 0;
                _this.width5 = 0;
            };
            events.ativaInativaC();
        };
    }
    CategoryComponent.prototype.ngOnInit = function () {
        this.getQuantidade();
        this.funcao();
    };
    CategoryComponent = __decorate([
        core_1.Component({
            selector: 'app-category',
            templateUrl: './category.component.html',
            styleUrls: ['./category.component.css']
        })
    ], CategoryComponent);
    return CategoryComponent;
}());
exports.CategoryComponent = CategoryComponent;
