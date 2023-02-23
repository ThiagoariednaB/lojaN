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

/*const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}*/

const ProdutosController = require('../controller/produtos-controller')
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 } })


//RETORNA TODOS OS PRODUTOS
router.get('/', ProdutosController.getProdutos)

//RETORNA UM PRODUTO
router.get('/:id_produto', ProdutosController.getProdutosId)

//INSERE UM PRODUTO
router.post('/', upload.single('produto_imagem'), ProdutosController.postProdutos)

//ALTERA OS DADOS DE UM PRODUTO
router.patch('/', login.obrigatorio, ProdutosController.patchProdutos)

//DELETA UM PRODUTO
router.delete('/', login.obrigatorio, ProdutosController.deleteProdutos)

module.exports = router
