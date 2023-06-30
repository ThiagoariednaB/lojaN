const mysql = require('../mysql').pool

exports.getCategorias = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error })
    }
    conn.query(
      `SELECT * FROM categorias;`,
      (error, resultado, field) => {
        conn.release()

        if (error) {
          return res.status(500).send({ error: error })
        }
        const response = {
          categoria: resultado.map(prod => {
            return {
              id_categoria: prod.id_categoria,
              categoria: prod.categoria,
            }
          })
        }
        return res.status(200).send({ response })
      }
    )
  })
}