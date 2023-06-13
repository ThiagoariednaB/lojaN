"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var header_component_1 = require("./components/template/header/header.component");
var footer_component_1 = require("./components/template/footer/footer.component");
var layout_component_1 = require("./components/layout/layout.component");
var home_component_1 = require("./components/views/home/home.component");
var login_component_1 = require("./components/views/login/login.component");
var category_component_1 = require("./components/views/category/category.component");
var produtos_component_1 = require("./components/views/produtos/produtos.component");
var carrinho_compras_component_1 = require("./components/views/carrinho-compras/carrinho-compras.component");
var pt_1 = require("@angular/common/locales/pt");
var common_1 = require("@angular/common");
common_1.registerLocaleData(pt_1["default"]);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                home_component_1.HomeComponent,
                layout_component_1.LayoutComponent,
                login_component_1.LoginComponent,
                category_component_1.CategoryComponent,
                produtos_component_1.ProdutosComponent,
                carrinho_compras_component_1.CarrinhoComprasComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule
            ],
            providers: [http_1.HttpClient, { provide: core_1.LOCALE_ID, useValue: 'pt' }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
