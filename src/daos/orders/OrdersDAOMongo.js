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

export const createNewOrder = async (idCart, user) => {
	const cartById = await cartsModel.findById(idCart).lean();
	if (cartById === null) {
		return {
			message: `El carrito con Id ${idCart} no fue encontrado`,
		};
	}

	const newOrder = new ordersModel({
		user: {
			firstName: user.name.first,
			lastName: user.name.last,
		},
		userId: user.name._id,
		address: {
			street: user.address.street,
			streetNum: user.address.streetNum,
			departmentNum: user.address.departmentNum,
		},
		products: cartById.products,
	});

	await newOrder.save();
	const seeNewOrder = await ordersModel.findOne({ userId: user.name._id });
	return seeNewOrder;
};
