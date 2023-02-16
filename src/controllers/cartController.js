import * as cartService from '../services/cartService.js';

export const createCart = async (req, res) => {
	const newCart = await cartService.createCart();
	res.status(201).send(newCart);
};

export const getAllCarts = async (req, res) => {
	const { limit, since } = req.params;
	const allCarts = await cartService.getAllCarts(limit, since);
	res.send(allCarts);
};

export const deletCart = async (req, res) => {
	const { cartId } = req.params;
	if (!cartId) return;

	const cartDeleted = await cartService.deletCart(cartId);
	res.status(200).send(cartDeleted);
};

export const cartProductById = async (req, res) => {
	const { cartId } = req.params;
	const productsInCartId = await cartService.cartProductById(cartId);
	res.status(200).send({ status: 'ok', data: productsInCartId });
};

export const addProductToCart = async (req, res) => {
	const { cartId } = req.params;
	const { body } = req;
	const saveProdInCart = await cartService.addProductToCart(cartId, body);
	res.status(201).send(saveProdInCart);
};

export const deleteProductInCart = async (req, res) => {
	const { cartId, prodId } = req.params;
	const deletedProd = await cartService.deleteProductInCart(cartId, prodId);
	res.send({
		status: 'ok',
		message: `Producto id: ${prodId} eliminado`,
		data: deletedProd,
	});
};
