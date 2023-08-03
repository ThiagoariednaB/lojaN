"use strict";

var _require = require('express'),
    query = _require.query;

var mysql = require('../mysql').pool;

exports.getProdutos = function (req, res, next) {
  mysql.getConnection(function (error, conn) {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }

    conn.query("SELECT * FROM mydb.produtos  limit ?  offset ?;", (query, [parseInt(req.query.limit), parseInt(req.query.offset)]), function (error, resultado, field) {
      conn.release();

      if (error) {
        return res.status(500).send({
          error: error
        });
      }

      var response = {
        quantidade: resultado.length,
        produtos: resultado.map(function (prod) {
          return {
            id_produto: prod.id_produto,
            descricao: prod.descricao,
            un: prod.un,
            preco: prod.preco,
            produto_imagem: prod.produto_imagem,
            categoria: prod.categoria,
            descricaoProduto: prod.descricaoProduto
          };
        })
      };
      return res.status(200).send({
        response: response
      });
    });
  });
};

exports.getProdutosCat = function (req, res, next) {
  mysql.getConnection(function (error, conn) {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }

    try {
      conn.query("SELECT * FROM mydb.produtos WHERE categoria = ?;", [req.params.categoria], function (error, resultado, field) {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error
          });
        }

        if (resultado.length == 0) {
          return res.status(404).send({
            mensagem: 'Não foi encontrado produto com essa categoria'
          });
        }

        var response = {
          produtos: resultado.map(function (prod) {
            return {
              id_produto: prod.id_produto,
              descricao: prod.descricao,
              un: prod.un,
              preco: prod.preco,
              produto_imagem: prod.produto_imagem,
              categoria: prod.categoria,
              quantidade: prod.quantidade,
              descricaoProduto: prod.descricaoProduto,
              request: {
                tipo: 'GET',
                descricao: 'Retorna um produto e seus detalhes',
                url: 'http://localhost:3000/produtos/id_produto'
              }
            };
          })
        };
        return res.status(201).send(response);
      });
    } catch (error) {
      return res.status(401).json(error);
    }
  });
};

exports.getProdutoId = function (req, res, next) {
  mysql.getConnection(function (error, conn) {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }

    conn.query("SELECT * FROM mydb.produtos WHERE id_produto = ?;", [req.params.id_produto], function (error, resultado, field) {
      conn.release();

      if (error) {
        return res.status(500).send({
          error: error
        });
      }

      if (resultado.length == 0) {
        return res.status(404).send({
          mensagem: 'Não foi encontrado produto com essa id'
        });
      }

      var response = {
        produtos: resultado.map(function (prod) {
          return {
            id_produto: prod.id_produto,
            descricao: prod.descricao,
            un: prod.un,
            preco: prod.preco,
            produto_imagem: prod.produto_imagem,
            categoria: prod.categoria,
            quantidade: prod.quantidade,
            descricaoProduto: prod.descricaoProduto,
            request: {
              tipo: 'GET',
              descricao: 'Retorna um produto e seus detalhes',
              url: 'http://localhost:3000/produtos/id_produto'
            }
          };
        })
      };
      return res.status(201).send(response);
    });
  });
};

exports.postProdutos = function (req, res, next) {
  mysql.getConnection(function (error, conn) {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }

    conn.query('INSERT INTO mydb.produtos (descricao, un, preco, produto_imagem) VALUES (?,?,?,?)', [req.body.descricao, req.body.un, req.body.preco, req.file.path], function (error, resultado, field) {
      conn.release();

      if (error) {
        return res.status(500).send({
          error: error
        });
      }

      var response = {
        mensagem: 'Produto salvo com sucesso',
        produtos: {
          id_produto: resultado.id_produto,
          descricao: req.body.descricao,
          un: req.body.un,
          preco: req.body.preco,
          produto_imagem: req.file.path,
          request: {
            tipo: 'POST',
            descricao: 'Insere um produto',
            url: 'http://localhost:3000/produtos'
          }
        }
      };
      return res.status(201).send(response);
    });
  });
};

exports.patchProdutos = function (req, res, next) {
  mysql.getConnection(function (error, conn) {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }

    conn.query("UPDATE produtos\n          SET descricao       =?,\n              un              =?,\n              preco           =?,\n              produto_imagem  =?,\n              id_categoria    =?,\n              categoria       =?,\n        WHERE id_produto      =?", [req.body.descricao, req.body.un, req.body.preco, req.file.path, req.body.id_produto, req.body.id_categoria, req.body.categoria], function (error, resultado, field) {
      conn.release();

      if (error) {
        return res.status(500).send({
          error: error
        });
      }

      if (resultado.length == 0) {
        return res.status(404).send({
          mensagem: 'ID não encontrado'
        });
      }

      var response = {
        mensagem: 'Produto atualizado com sucesso',
        produtoAtualizado: {
          id_produto: req.body.id_produto,
          descricao: req.body.descricao,
          un: req.body.un,
          preco: req.body.preco,
          produto_imagem: req.file.path,
          id_categoria: req.body.id_categoria,
          categoria: req.body.categoria,
          request: {
            tipo: 'PATCH',
            descricao: 'Altera um produto',
            url: 'http://localhost:3000/produtos' + req.body.id_produto
          }
        }
      };
      return res.status(202).send(response);
    });
  });
};

exports.deleteProdutos = function (req, res, next) {
  mysql.getConnection(function (error, conn) {
    if (error) {
      return res.status(500).send({
        error: error
      });
    }

    conn.query("DELETE FROM produtos WHERE id_produto = ?", [req.body.id_produto], function (error, resultado, field) {
      conn.release();

      if (error) {
        return res.status(500).send({
          error: error
        });
      }

      var response = {
        mensagem: 'Produto deletado com sucesso',
        produtoDeletado: {
          request: {
            tipo: 'DELETE',
            descricao: 'Deleta um produto',
            url: 'http://localhost:3000/produtos',
            body: {
              descricao: 'String',
              un: 'String',
              preco: 'Number'
            }
          }
        }
      };
      return res.status(202).send(response);
    });
  });
};