"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(CarrinhoService, ProductService) {
        var _this = this;
        this.CarrinhoService = CarrinhoService;
        this.ProductService = ProductService;
        this.categorias = [];
        this.produtos = [];
        this.zindexMenuAtivo = 5;
        this.zindexMenuInativo = 0;
        this.top1 = 15;
        this.display = '';
        this.top3 = 30;
        this.transition = 0;
        this.transform1 = '';
        this.transform3 = '';
        this.width1 = 48;
        this.width3 = 48;
        this.width4 = 0;
        this.width5 = 0;
        this.zindex = 0;
        this.width6 = 0.2;
        this.backgroundcolor = '';
        this.border = '2px solid white';
        this.color = 'white';
        this.funcao = function () {
            var get = function () {
                _this.ProductService.getCategory().subscribe(function (data) {
                    _this.categorias = data['response'].categoria;
                });
                return get;
            };
            get();
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
                        desativar();
                    });
                    html.get('.atalhosFundo').addEventListener('click', function () {
                        desativar();
                    });
                }
            };
            var ativa = function () {
                _this.zindexMenuAtivo = 4;
                _this.zindexMenuInativo = 5;
                _this.top1 = 24;
                _this.display = 'none';
                _this.top3 = 21;
                _this.transition = 0.3;
                _this.transform1 = 'rotate(45deg)';
                _this.transform3 = 'rotate(-45deg)';
                _this.width1 = 50;
                _this.width3 = 50;
                _this.width4 = 250;
                _this.width5 = 100;
                _this.zindex = 3;
            };
            var desativar = function () {
                _this.zindexMenuAtivo = 5;
                _this.zindexMenuInativo = 4;
                _this.top1 = 15;
                _this.display = 'block';
                _this.top3 = 30;
                _this.transition = 0.3;
                _this.transform1 = 'rotate(0deg)';
                _this.transform3 = 'rotate(-0deg)';
                _this.width1 = 48;
                _this.width3 = 48;
                _this.width4 = 0;
                _this.width5 = 0;
                _this.zindex = 0;
            };
            events.ativaEventos();
        };
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.funcao();
        this.produtos = this.CarrinhoService.obterItens(this.produtos);
    };
    HeaderComponent.prototype.obterTotalItens = function () {
        return this.CarrinhoService.obterTotalItens();
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
