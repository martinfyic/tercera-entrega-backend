import * as orderService from '../services/orderService.js';
import { logger } from '../config/index.js';

export const getAllOrders = async (req, res) => {
	try {
		const { limit, since } = req.params;
		const allOrders = await orderService.getAllOrders(limit, since);
		res.send(allOrders);
	} catch (error) {
		logger.error(error);
	}
};

export const createNewOrder = async (req, res) => {
	try {
		const { idCart } = req.body;
		const { user } = req;

		const order = await orderService.createNewOrder(idCart, user);
		res.status(201).render('order', { title: '⚡ Orden de compra', order });
	} catch (error) {
		logger.error(error);
	}
};
