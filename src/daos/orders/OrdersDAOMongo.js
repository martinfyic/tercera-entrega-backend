import ordersModel from '../../schemas/ordersSchema.js';
import cartsModel from '../../schemas/cartsSchema.js';

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

	// await newCart.save();
	return {
		status: 'OK',
		// data: newCart,
	};
};
