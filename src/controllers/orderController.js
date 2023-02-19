import * as orderService from '../services/orderService.js';

export const getAllOrders = async (req, res) => {
	const { limit, since } = req.params;
	const allOrders = await orderService.getAllOrders(limit, since);
	res.send(allOrders);
};

export const createNewOrder = async (req, res) => {
	const { idCart } = req.body;
	const order = await orderService.createNewOrder(idCart);
	res.status(201).send(order);
};
