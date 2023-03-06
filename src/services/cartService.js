import * as Cart from '../daos/carts/CartsDAOMongo.js';
import { logger } from '../config/index.js';

export const createCart = async user => {
	try {
		const cartGenerated = await Cart.createCart(user);
		return cartGenerated;
	} catch (error) {
		logger.error(error);
	}
};

export const getAllCarts = async (limit, since) => {
	try {
		const allCarts = await Cart.getAllCarts(limit, since);
		return allCarts;
	} catch (error) {
		logger.error(error);
	}
};

export const deletCart = async cartId => {
	try {
		await Cart.deletCart(cartId);
	} catch (error) {
		logger.error(error);
	}
};

export const cartProductById = async cartId => {
	try {
		const productInCart = await Cart.cartProductById(cartId);
		return productInCart;
	} catch (error) {
		logger.error(error);
	}
};

export const addProductToCart = async (cartId, prodId) => {
	try {
		const prodSelectedById = await Cart.searchProd(prodId);
		await Cart.addProductToCart(cartId, prodSelectedById);
	} catch (error) {
		logger.error(error);
	}
};

export const deleteProductInCart = async (cartId, prodId) => {
	try {
		const prodDeleted = await Cart.deleteProductInCart(cartId, prodId);
		return prodDeleted;
	} catch (error) {
		logger.error(error);
	}
};
