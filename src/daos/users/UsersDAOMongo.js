import { userModel, cartsModel } from '../../schemas/index.js';
import { createCart } from '../../services/cartService.js';

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
		throw error;
	}
};

export const getUserById = async id => {
	try {
		const user = await userModel.findById(id).exec();
		return user;
	} catch (error) {
		throw error;
	}
};

export const createNewUser = async newUser => {
	try {
		const isAlreadyAdded = await userModel
			.findOne({ email: newUser.email })
			.exec();
		if (isAlreadyAdded !== null)
			return {
				message: `El email ${newUser.email} ya esta registrado`,
			};

		const saveNewUser = new userModel({
			name: {
				first: newUser.name.first,
				last: newUser.name.last,
			},
			email: newUser.email,
			password: newUser.password,
			avatar: newUser.avatar,
			phone: newUser.phone,
			address: {
				street: newUser.address.street,
				streetNum: newUser.address.streetNum,
				departmentNum: newUser.address.departmentNum,
			},
			age: newUser.age,
		});

		await saveNewUser.save();
		return {
			message: 'Usuario registrado en DB',
			data: saveNewUser,
		};
	} catch (error) {
		throw error;
	}
};

export const createUserCart = async user => {
	const cartUser = await cartsModel
		.findOne({ userId: user._id.toString() })
		.lean()
		.exec();

	if (cartUser) return cartUser;

	const newCartUser = await createCart(user);
	return newCartUser;
};
