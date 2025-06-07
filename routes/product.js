const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController.js');

const productsController = new ProductController();

router.get('/', (req, res, next)=>{
    productsController.getProducts(req.body)
    .then((result) => {
        res.send(result);
    })
});
router.post('/', (req, res, next)=>{
    productsController.postProduct(req.body)
    .then((result) => {
        res.send(result);
    })
});
router.delete('/:id', (req, res, next) => {
    productsController.deleteProduct(req.params.id)
    .then((result) => {
        console.log("result delete", result);  
        res.send(result);
    })
});
router.get('/:id', (req, res, next) => {
    productsController.getProductById(req.params.id)
    .then((result) => {
        res.send(result);
    })
});
router.put('/:id', (req, res, next) => {
    productsController.updateProduct(req.params.id, req.body)
    .then((result) => {
        console.log("result put", result);  
        res.send(result);
    })
});

module.exports = router;

