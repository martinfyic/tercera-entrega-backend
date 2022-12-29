import { v4 as uuidv4 } from 'uuid';
import * as Cart from '../daos/carts/CartsDAOMongo.js';

export const createCart = async () => {
	const newCart = {
		cartId: uuidv4(),
		products: [],
		timestampCreated: new Date().toLocaleString('es-UY'),
		timestampUpdated: new Date().toLocaleString('es-UY'),
	};
	const cartGenerated = await Cart.createCart(newCart);
	return cartGenerated;
};

export const getAllCarts = async () => {
	const allCarts = await Cart.getAllCarts();
	return allCarts;
};

export const deletCart = async cartId => {
	const cartDeleted = await Cart.deletCart(cartId);
	return cartDeleted;
};

export const cartProductById = async cartId => {
	const productInCart = await Cart.cartProductById(cartId);
	return productInCart;
};

export const addProductToCart = async (cartId, prodId) => {
	const prodSelectedById = await Cart.searchProd(prodId);
	const productAddedToCart = await Cart.addProductToCart(
		cartId,
		prodSelectedById
	);
	return productAddedToCart;
};

export const deleteProductInCart = async (cartId, prodId) => {
	const prodDeleted = await Cart.deleteProductInCart(cartId, prodId);
	return prodDeleted;
};
