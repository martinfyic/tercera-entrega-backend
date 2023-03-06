import * as Orders from '../daos/orders/OrdersDAOMongo.js';
import * as Carts from '../daos/carts/CartsDAOMongo.js';
import { sendWhatsapp, logger } from '../config/index.js';
import { cartsModel } from '../schemas/index.js';
import { orderEmail } from '../templates/orderEmail.js';

export const getAllOrders = async (limit, since) => {
	try {
		const allOrders = await Orders.getAllOrders(limit, since);
		return allOrders;
	} catch (error) {
		logger.error(error);
	}
};

export const createNewOrder = async (idCart, user) => {
	try {
		const cartBuy = await cartsModel.findById(idCart).lean();
		if (cartBuy === null) return { message: 'Carrito no encontrado' };
		const savedOrder = await Orders.createNewOrder(idCart, user);

		await orderEmail(savedOrder, user);

		await sendWhatsapp(process.env.PHONE_TEST, savedOrder._id); // --> change process.env.PHONE_TEST for user.phone to send whatsapp to client

		await Carts.deletCart(idCart);
		return savedOrder;
	} catch (error) {
		logger.error(error);
	}
};
