import { cartFormatSchemaDTO } from '../../dto/Carts/CartsDTO.js';
import { cartsModel, productsModel } from '../../schemas/index.js';
import { logger } from '../../config/index.js';

export const createCart = async user => {
	try {
		const cartGenerated = cartFormatSchemaDTO(user);
		await cartGenerated.save();
		return cartGenerated;
	} catch (error) {
		logger.error(error);
	}
};

export const getAllCarts = async (limit = 10, since = 0) => {
	try {
		const allCarts = await cartsModel
			.find({})
			.limit(Number(limit))
			.skip(Number(since));
		const totalCarts = await cartsModel.countDocuments({});
		return {
			totalCarts,
			allCarts,
		};
	} catch (error) {
		logger.error(error);
	}
};

export const deletCart = async cartId => {
	try {
		const searchForDelete = await cartsModel.findByIdAndDelete(cartId);
		if (searchForDelete === null)
			return {
				status: 'Error',
				message: `El Id: ${cartId} no fue encontrado`,
			};
	} catch (error) {
		logger.error(error);
	}
};

export const cartProductById = async cartId => {
	try {
		const indexForCartProduct = await cartsModel.findById(cartId);
		if (indexForCartProduct === null)
			return {
				status: 'Error',
				message: `No se encontro el carrito con Id: ${cartId}`,
			};

		return indexForCartProduct;
	} catch (error) {
		logger.error(error);
	}
};

export const searchProd = async prodId => {
	try {
		const prodSelected = await productsModel.findById(prodId);
		if (prodSelected === null)
			return {
				status: 'Error',
				message: `No se encontro el producto con Id: ${prodId}`,
			};
		return prodSelected;
	} catch (error) {
		logger.error(error);
	}
};

export const addProductToCart = async (cartId, prodSelectedById) => {
	try {
		if (prodSelectedById?.status === 'Error') return prodSelectedById;

		const cartProduct = await cartsModel.findById(cartId).lean();
		if (cartProduct === null)
			return {
				status: 'Error',
				message: `No se encontro el carrito con Id: ${cartId}`,
			};

		const existProduct = cartProduct.products.find(
			product => product._id.toString() === prodSelectedById._id.toString()
		);

		if (existProduct) {
			const products = cartProduct.products.map(prodInCart => {
				if (prodInCart._id.toString() === prodSelectedById._id.toString()) {
					prodInCart.quantity += 1;
					prodInCart.stock -= 1;
					prodInCart.total = prodInCart.quantity * prodInCart.price;
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
	} catch (error) {
		logger.error(error);
	}
};

export const deleteProductInCart = async (cartId, prodId) => {
	try {
		const cartProduct = await cartsModel.findById(cartId).lean();

		if (cartProduct === null)
			return {
				status: 'Error',
				message: `El carrito con Id: ${cartId} no fue encontrado`,
			};

		const existProduct = cartProduct.products.find(
			product => product._id.toString() === prodId
		);

		if (existProduct.quantity === 1) {
			const products = cartProduct.products.filter(
				prodInCart => prodInCart._id.toString() !== prodId
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
				if (prodInCart._id.toString() === prodId) {
					prodInCart.quantity -= 1;
					prodInCart.stock += 1;
					prodInCart.total = prodInCart.quantity * prodInCart.price;
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
	} catch (error) {
		logger.error(error);
	}
};
