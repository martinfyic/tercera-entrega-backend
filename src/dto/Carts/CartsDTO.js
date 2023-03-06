import { cartsModel } from '../../schemas/index.js';
import { logger } from '../../config/index.js';

export const cartFormatSchemaDTO = user => {
	try {
		const saveNewCart = new cartsModel({
			products: [],
			name: user.name.first,
			lastname: user.name.last,
			userId: user._id,
		});
		return saveNewCart;
	} catch (error) {
		logger.error(error);
	}
};
