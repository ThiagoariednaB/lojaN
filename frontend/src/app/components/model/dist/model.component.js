"use strict";
exports.__esModule = true;
exports.categorias = exports.produtos = void 0;
var produtos = /** @class */ (function () {
    function produtos() {
        this.id_produto = 0;
        this.descricao = '';
        this.un = '';
        this.preco = 0;
        this.produto_imagem = '';
        this.quantidade = 0;
        this.categoria = '';
        this.descricaoProduto = '';
        this.estoque = 0;
        this.qItensIguais = 0;
    }
    return produtos;
}());
exports.produtos = produtos;
var categorias = /** @class */ (function () {
    function categorias() {
        this.id_categoria = 0;
        this.categoria = '';
    }
    return categorias;
}());
exports.categorias = categorias;
