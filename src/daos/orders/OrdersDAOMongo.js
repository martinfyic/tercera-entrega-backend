import { ordersModel, cartsModel } from '../../schemas/index.js';

export const getAllOrders = async (limit = 10, since = 0) => {
	const allOrders = await productsModel
		.find({})
		.limit(Number(limit))
		.skip(Number(since));
	const totalOrders = await ordersModel.countDocuments({});
	return {
		totalOrders,
		allOrders,
	};
};

export const createNewOrder = async idCart => {
	const cartById = await cartsModel.findById(idCart).lean();
	if (cartById === null) {
		return {
			message: `El carrito con Id ${idCart} no fue encontrado`,
		};
	}
	await cartById.save();
};
