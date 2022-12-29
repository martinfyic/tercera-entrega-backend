const express = require('express');
const cartController = require('../../controllers/cartController');

const cartRouter = express.Router();

cartRouter
	.post('/', cartController.createCart)
	.delete('/:cartId', cartController.deletCart)
	.get('/:cartId/productos', cartController.cartProductById)
	.get('/', cartController.getAllCarts)
	.post('/:cartId/productos', cartController.addProductToCart)
	.delete('/:cartId/productos/:prodId', cartController.deleteProductInCart);

module.exports = cartRouter;
