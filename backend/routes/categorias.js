const express = require('express')
const router = express.Router()
const multer = require('multer')
const login = require('../middleware/login')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toDateString() + file.originalname)
    }
})

const CategoriasController = require('../controller/categorias-controller')
const ProdutosController = require('../controller/produtos-controller')
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 }})

//RETORNA TODAS AS CATEGORIAS
router.get('/', CategoriasController.getCategorias)

//RETORNA TODOS OS PRODUTOS POR CATEGORIA
router.get('/:categoria', ProdutosController.getProdutosCat)

module.exports = router
