import * as cartService from '../services/cartService.js';
import { logger } from '../config/index.js';

export const createCart = async (req, res) => {
	try {
		const { user } = req;
		const newCart = await cartService.createCart(user);
		res.status(201).send(newCart);
	} catch (error) {
		logger.error(error);
	}
};

export const getAllCarts = async (req, res) => {
	try {
		const { limit, since } = req.params;
		const allCarts = await cartService.getAllCarts(limit, since);
		res.send(allCarts);
	} catch (error) {
		logger.error(error);
	}
};

export const deletCart = async (req, res) => {
	try {
		const { cartId } = req.params;
		if (!cartId) return;
		await cartService.deletCart(cartId);
		res.status(200);
	} catch (error) {
		logger.error(error);
	}
};

export const cartProductById = async (req, res) => {
	try {
		const { cartId } = req.params;
		const productsInCartId = await cartService.cartProductById(cartId);
		res
			.status(200)
			.render('cartUser', { title: '⚡ Carrito', productsInCartId });
	} catch (error) {
		logger.error(error);
	}
};

export const addProductToCart = async (req, res) => {
	try {
		const { cartId } = req.params;
		const { body } = req;
		await cartService.addProductToCart(cartId, body);
		res.status(200).redirect('/api/v1/productos');
	} catch (error) {
		logger.error(error);
	}
};

export const deleteProductInCart = async (req, res) => {
	try {
		const { cartId, prodId } = req.params;
		const deletedProd = await cartService.deleteProductInCart(cartId, prodId);
		res.send({
			status: 'ok',
			message: `Producto id: ${prodId} eliminado`,
			data: deletedProd,
		});
	} catch (error) {
		logger.error(error);
	}
};
