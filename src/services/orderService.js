import * as Orders from '../daos/orders/OrdersDAOMongo.js';

export const getAllOrders = async (limit, since) => {
	const allOrders = await Orders.getAllOrders(limit, since);
	return allOrders;
};

export const createNewOrder = async idCart => {
	const savedOrder = await Orders.createNewOrder(idCart);
	return savedOrder;
};
