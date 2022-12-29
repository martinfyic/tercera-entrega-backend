const { v4: uuidv4 } = require('uuid');
const Cart = require('../daos/carts/CartsDAOMongo');

const createCart = async () => {
	const newCart = {
		cartId: uuidv4(),
		products: [],
		timestampCreated: new Date().toLocaleString('es-UY'),
		timestampUpdated: new Date().toLocaleString('es-UY'),
	};
	const cartGenerated = await Cart.createCart(newCart);
	return cartGenerated;
};

const getAllCarts = async () => {
	const allCarts = await Cart.getAllCarts();
	return allCarts;
};

const deletCart = async cartId => {
	const cartDeleted = await Cart.deletCart(cartId);
	return cartDeleted;
};

const cartProductById = async cartId => {
	const productInCart = await Cart.cartProductById(cartId);
	return productInCart;
};

const addProductToCart = async (cartId, prodId) => {
	const prodSelectedById = await Cart.searchProd(prodId);
	const productAddedToCart = await Cart.addProductToCart(
		cartId,
		prodSelectedById
	);
	return productAddedToCart;
};

const deleteProductInCart = async (cartId, prodId) => {
	const prodDeleted = await Cart.deleteProductInCart(cartId, prodId);
	return prodDeleted;
};

module.exports = {
	createCart,
	getAllCarts,
	deletCart,
	cartProductById,
	addProductToCart,
	deleteProductInCart,
};
