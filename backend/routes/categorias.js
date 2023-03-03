const express = require('express')
const router = express.Router()

const CategoriasController = require('../controller/categorias-controller')

//RETORNA TODAS AS CATEGORIAS
router.get('/', CategoriasController.getCategorias)

module.exports = router
