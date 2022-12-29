const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const productController = require('../../controllers/productController');

const prodRouter = express.Router();

prodRouter
	.get('/', productController.getAllProducts)
	.get('/:prodId', productController.getProductById)
	.post('/', authMiddleware.userRole, productController.createNewProduct)
	.put('/:prodId', authMiddleware.userRole, productController.upDateOneProduct)
	.delete(
		'/:prodId',
		authMiddleware.userRole,
		productController.deleteOneProduct
	);

module.exports = prodRouter;
