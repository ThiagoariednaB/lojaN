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
        this.width = 0;
        this.funcao = function () {
            var getCategory = function () {
                _this.ProductService.getCategory().subscribe(function (data) {
                    _this.categorias = data['response'].categoria;
                });
                return getCategory;
            };
            var html = {
                get: function (element) {
                    return document.querySelector(element);
                }
            };
            var events = {
                ativaEventos: function () {
                    html.get('.menuAtivo').addEventListener('click', function () {
                        ativa();
                    });
                    html.get('.menuInativo').addEventListener('click', function () {
                        desativa();
                    });
                    html.get('.atalhosFundo').addEventListener('click', function () {
                        desativa();
                    });
                    html.get('.categorias').addEventListener('click', getCategory());
                }
            };
            var ativa = function () {
                _this.width = 300;
            };
            var desativa = function () {
                _this.width = 0;
            };
            events.ativaEventos();
        };
    }
    CategoryComponent.prototype.ngOnInit = function () {
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
