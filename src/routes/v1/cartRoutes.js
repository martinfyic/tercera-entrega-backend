import express from 'express';
import * as cartController from '../../controllers/cartController.js';

const v1CartRouter = express.Router();

v1CartRouter
	.post('/', cartController.createCart)
	.delete('/:cartId', cartController.deletCart)
	.get('/:cartId/productos', cartController.cartProductById)
	.get('/', cartController.getAllCarts)
	.post('/:cartId/productos', cartController.addProductToCart)
	.delete('/:cartId/productos/:prodId', cartController.deleteProductInCart);

export default v1CartRouter;
