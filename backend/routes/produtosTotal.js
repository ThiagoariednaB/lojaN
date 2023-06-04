const express = require('express')
const router2 = express.Router()
const multer = require('multer')

const ProdutosControllerTotal = require('../controller/produtos-controllerTotal')

//RETORNA OS PRODUTOS PAGINADOS
router2.get('/', ProdutosControllerTotal.getProdutosT)

module.exports = router2
