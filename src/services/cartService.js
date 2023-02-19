import * as Cart from '../daos/carts/CartsDAOMongo.js';

export const createCart = async user => {
	const newCart = {
		products: [],
		firstName: user.name.first,
		lastName: user.name.last,
		userId: user._id.toString(),
	};
	const cartGenerated = await Cart.createCart(newCart);
	return cartGenerated;
};

export const getAllCarts = async (limit, since) => {
	const allCarts = await Cart.getAllCarts(limit, since);
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
