import { ordersFormatSchemaDTO } from '../../dto/Order/OrdersDTO.js';
import { ordersModel, cartsModel } from '../../schemas/index.js';
import { logger } from '../../config/index.js';

export const getAllOrders = async (limit = 10, since = 0) => {
	try {
		const allOrders = await productsModel
			.find({})
			.limit(Number(limit))
			.skip(Number(since));
		const totalOrders = await ordersModel.countDocuments({});
		return {
			totalOrders,
			allOrders,
		};
	} catch (error) {
		logger.error(error);
	}
};

export const createNewOrder = async (idCart, user) => {
	try {
		const cartById = await cartsModel.findById(idCart).lean();
		if (cartById === null) {
			return {
				message: `El carrito con Id ${idCart} no fue encontrado`,
			};
		}

		const newOrder = ordersFormatSchemaDTO(user, cartById);

		await newOrder.save();
		const seeNewOrder = await ordersModel.findOne({ userId: user.name._id });
		return seeNewOrder;
	} catch (error) {
		logger.error(error);
	}
};
