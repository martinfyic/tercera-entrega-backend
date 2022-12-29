const cartService = require('../services/cartService');

const createCart = async (req, res) => {
	const newCart = await cartService.createCart();
	res.status(201).send(newCart);
};

const getAllCarts = async (req, res) => {
	const allCarts = await cartService.getAllCarts();
	res.send(allCarts);
};

const deletCart = async (req, res) => {
	const { cartId } = req.params;
	if (!cartId) return;

	const cartDeleted = await cartService.deletCart(cartId);
	res.status(200).send(cartDeleted);
};

const cartProductById = async (req, res) => {
	const { cartId } = req.params;
	const productsInCartId = await cartService.cartProductById(cartId);
	res.status(200).send({ status: 'ok', data: productsInCartId });
};

const addProductToCart = async (req, res) => {
	const { cartId } = req.params;
	const { body } = req;
	const saveProdInCart = await cartService.addProductToCart(cartId, body);
	res.status(201).send(saveProdInCart);
};

const deleteProductInCart = async (req, res) => {
	const { cartId, prodId } = req.params;
	const deletedProd = await cartService.deleteProductInCart(cartId, prodId);
	res.send({
		status: 'ok',
		message: `Producto id: ${prodId} eliminado`,
		data: deletedProd,
	});
};

module.exports = {
	createCart,
	getAllCarts,
	deletCart,
	cartProductById,
	addProductToCart,
	deleteProductInCart,
};
