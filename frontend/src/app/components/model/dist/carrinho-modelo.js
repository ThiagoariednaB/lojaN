"use strict";
exports.__esModule = true;
exports.carrinho2 = exports.carrinho1 = void 0;
var carrinho1 = /** @class */ (function () {
    function carrinho1(produtos, quantidade) {
        if (quantidade === void 0) { quantidade = 1; }
        this.produtos = produtos;
        this.quantidade = quantidade;
    }
    return carrinho1;
}());
exports.carrinho1 = carrinho1;
var carrinho2 = /** @class */ (function () {
    function carrinho2() {
        this.id_produto = 0;
        this.descricao = '';
        this.un = '';
        this.preco = 0;
        this.produto_imagem = '';
        this.quantidade = 0;
        this.categoria = '';
        this.descricaoProduto = '';
        this.estoque = 0;
        this.count = 0;
    }
    return carrinho2;
}());
exports.carrinho2 = carrinho2;
