import { userFormatSchemaDTO } from '../../dto/User/UsersDTO.js';
import { userModel, cartsModel } from '../../schemas/index.js';
import { createCart } from '../../services/cartService.js';
import { logger } from '../../config/index.js';

export const getAllUsers = async (limit = 10, since = 0) => {
	try {
		const allUsers = await userModel
			.find({})
			.limit(Number(limit))
			.skip(Number(since))
			.exec();

		const totalUsers = await userModel.countDocuments({}).exec();
		return {
			totalUsers,
			allUsers,
		};
	} catch (error) {
		logger.error(error);
	}
};

export const getUserById = async id => {
	try {
		const user = await userModel.findById(id).exec();
		return user;
	} catch (error) {
		logger.error(error);
	}
};

export const createNewUser = async (body, avatar) => {
	try {
		const isAlreadyAdded = await userModel
			.findOne({ email: body.email })
			.exec();
		if (isAlreadyAdded !== null)
			return {
				message: `El email ${body.email} ya esta registrado`,
			};

		const saveNewuser = userFormatSchemaDTO(body, avatar);

		await saveNewuser.save();
		return {
			message: 'Usuario registrado en DB',
			data: saveNewuser,
		};
	} catch (error) {
		logger.error(error);
	}
};

export const createUserCart = async user => {
	try {
		const cartUser = await cartsModel
			.findOne({ userId: user._id.toString() })
			.lean()
			.exec();

		if (cartUser) return cartUser;

		const newCartUser = await createCart(user);
		return newCartUser;
	} catch (error) {
		logger.error(error);
	}
};
