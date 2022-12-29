const cartsModel = require('../../schemas/cartsSchema');
const productsModel = require('../../schemas/productsSchema');

const createCart = async newCart => {
	const cartGenerated = new cartsModel({
		_id: newCart.cartId,
		products: newCart.products,
	});

	await cartGenerated.save();
	return {
		status: 'OK',
		message: `Carrito generado Id: ${newCart.cartId}`,
		data: cartGenerated,
	};
};

const getAllCarts = async () => {
	const allCarts = await cartsModel.find({});
	return allCarts;
};

const deletCart = async cartId => {
	const searchForDelete = await cartsModel.findByIdAndDelete(cartId);
	if (searchForDelete === null)
		return {
			status: 'Error',
			message: `El Id: ${cartId} no fue encontrado`,
		};

	return {
		status: 'OK',
		message: `El carrito con Id: ${cartId} fue eliminado`,
	};
};

const cartProductById = async cartId => {
	const indexForCartProduct = await cartsModel.findById(cartId);
	if (indexForCartProduct === null)
		return {
			status: 'Error',
			message: `No se encontro el carrito con Id: ${cartId}`,
		};

	return indexForCartProduct;
};

const searchProd = async prodId => {
	const prodSelected = await productsModel.findById(prodId);
	if (prodSelected === null)
		return {
			status: 'Error',
			message: `No se encontro el producto con Id: ${prodId}`,
		};
	return prodSelected;
};

const addProductToCart = async (cartId, prodSelectedById) => {
	if (prodSelectedById?.status === 'Error') return prodSelectedById;

	const cartProduct = await cartsModel.findById(cartId);
	if (cartProduct === null)
		return {
			status: 'Error',
			message: `No se encontro el carrito con Id: ${cartId}`,
		};

	const existProduct = cartProduct.products.find(
		product => product._id === prodSelectedById._id
	);

	if (existProduct) {
		const products = cartProduct.products.map(prodInCart => {
			if (prodInCart._id === prodSelectedById._id) {
				(prodInCart.quantity += 1),
					(prodInCart.stock -= 1),
					(prodInCart.total = prodInCart.quantity * prodInCart.price);
			}
			return prodInCart;
		});

		cartProduct.products = products;
		await cartsModel.findByIdAndUpdate(cartId, cartProduct);
		return {
			status: 'OK',
			message: `Producto ${prodSelectedById.title} agregado en carrito`,
			data: cartProduct,
		};
	} else {
		let addProd = [
			...cartProduct.products,
			{
				...prodSelectedById._doc,
				quantity: 1,
				total: prodSelectedById._doc.price,
				stock: prodSelectedById._doc.stock - 1,
			},
		];
		cartProduct.products = addProd;
		await cartsModel.findByIdAndUpdate(cartId, cartProduct);
		return {
			status: 'OK',
			message: `Producto ${prodSelectedById.title} agregado al carrito`,
			data: cartProduct,
		};
	}
};

const deleteProductInCart = async (cartId, prodId) => {
	const cartProduct = await cartsModel.findById(cartId);
	if (cartProduct === null)
		return {
			status: 'Error',
			message: `El carrito con Id: ${cartId} no fue encontrado`,
		};

	const existProduct = cartProduct.products.find(
		product => product._id === prodId
	);

	if (existProduct.quantity === 1) {
		const products = cartProduct.products.filter(
			prodInCart => prodInCart._id !== prodId
		);
		cartProduct.products = products;
		await cartsModel.findByIdAndUpdate(cartId, cartProduct);
		return {
			status: 'OK',
			message: 'Producto eliminado del carrito',
			data: cartProduct,
		};
	}

	if (existProduct) {
		const products = cartProduct.products.map(prodInCart => {
			if (prodInCart._id === prodId) {
				(prodInCart.quantity -= 1),
					(prodInCart.stock += 1),
					(prodInCart.total = prodInCart.quantity * prodInCart.price);
			}
			return prodInCart;
		});

		cartProduct.products = products;
		await cartsModel.findByIdAndUpdate(cartId, cartProduct);
		return {
			status: 'OK',
			message: 'Producto eliminado del carrito',
			data: cartProduct,
		};
	}
};

module.exports = {
	createCart,
	getAllCarts,
	deletCart,
	cartProductById,
	searchProd,
	addProductToCart,
	deleteProductInCart,
};
