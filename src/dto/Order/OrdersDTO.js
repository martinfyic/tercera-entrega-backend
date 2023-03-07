import { ordersModel } from '../../schemas/index.js';

export const ordersFormatSchemaDTO = (user, cartById) => {
	const newOrder = new ordersModel({
		user: {
			firstName: user.name.first,
			lastName: user.name.last,
		},
		userId: user.name._id,
		cartId: cartById._id,
		address: {
			street: user.address.street,
			streetNum: user.address.streetNum,
			departmentNum: user.address.departmentNum,
		},
		products: cartById.products,
	});

	return newOrder;
};
