const { query } = require('express')
const mysql = require('../mysql').pool

exports.getProdutos = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error })
    }
    conn.query(
      `SELECT * FROM mydb.produtos  limit ?  offset ?;`, (query, [parseInt(req.query.limit), parseInt(req.query.offset)]),
      (error, resultado, field) => {
        conn.release()

        if (error) {
          return res.status(500).send({ error: error })
        }
        const response = {
          quantidade: resultado.length,
          produtos: resultado.map(prod => {
            return {
              id_produto: prod.id_produto,
              descricao: prod.descricao,
              un: prod.un,
              preco: prod.preco,
              produto_imagem: prod.produto_imagem,
              categoria: prod.categoria,
              descricaoProduto: prod.descricaoProduto,
            }
          })
        }
        return res.status(200).send({ response })
      }
    )
  })
}

exports.getProdutosCat = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error })
    }
    conn.query(
      `SELECT * FROM mydb.produtos WHERE categoria = ?;`,
      [req.params.categoria],
      (error, resultado, field) => {
        conn.release()
        if (error) {
          return res.status(500).send({ error: error })
        }

        if (resultado.length == 0) {
          return res.status(404).send({
            mensagem: 'Não foi encontrado produto com essa categoria'
          })
        }
        const response = {
          produtos: resultado.map(prod => {
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
            }
          })
        }
        return res.status(201).send(response)
      }
    )
  })
}

exports.getProdutoId = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error })
    }
    conn.query(
      `SELECT * FROM mydb.produtos WHERE id_produto = ?;`,
      [req.params.id_produto],
      (error, resultado, field) => {
        conn.release()
        if (error) {
          return res.status(500).send({ error: error })
        }

        if (resultado.length == 0) {
          return res.status(404).send({
            mensagem: 'Não foi encontrado produto com essa categoria'
          })
        }
        const response = {
          produtos: resultado.map(prod => {
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
            }
          })
        }
        return res.status(201).send(response)
      }
    )
  })
}

exports.postProdutos = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error })
    }
    conn.query(
      'INSERT INTO mydb.produtos (descricao, un, preco, produto_imagem) VALUES (?,?,?,?)',
      [req.body.descricao, req.body.un, req.body.preco, req.file.path],
      (error, resultado, field) => {
        conn.release()
        if (error) {
          return res.status(500).send({ error: error })
        }
        const response = {
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
        }
        return res.status(201).send(response)
      }
    )
  })
}

exports.patchProdutos = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error })
    }
    conn.query(
      `UPDATE produtos
          SET descricao       =?,
              un              =?,
              preco           =?,
              produto_imagem  =?,
              id_categoria    =?,
              categoria       =?,
        WHERE id_produto      =?`,
      [
        req.body.descricao,
        req.body.un,
        req.body.preco,
        req.file.path,
        req.body.id_produto,
        req.body.id_categoria,
        req.body.categoria,
      ],
      (error, resultado, field) => {
        conn.release()
        if (error) {
          return res.status(500).send({ error: error })
        }
        if (resultado.length == 0) {
          return res.status(404).send({
            mensagem: 'ID não encontrado'
          })
        }
        const response = {
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
        }
        return res.status(202).send(response)
      }
    )
  })
}

exports.deleteProdutos = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error })
    }
    conn.query(
      `DELETE FROM produtos WHERE id_produto = ?`,
      [req.body.id_produto],
      (error, resultado, field) => {
        conn.release()
        if (error) {
          return res.status(500).send({ error: error })
        }
        const response = {
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
        }
        return res.status(202).send(response)
      }
    )
  })
}
