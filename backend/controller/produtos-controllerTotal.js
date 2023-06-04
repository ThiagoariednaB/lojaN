const { query } = require('express')
const mysql = require('../mysql').pool
const { error } = require('server/router')


exports.getProdutosT = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error })
    }
    conn.query(
      `SELECT * FROM mydb.produtos`,
      (error, resultado, field) => {
        conn.release()

        if (error) {
          return res.status(500).send({ error: error })
        }
        const response = {
          quantidade: resultado.length
        }
        return res.status(200).send({ response })
      }
    )
  })
}