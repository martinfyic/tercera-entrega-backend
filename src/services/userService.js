import * as Users from '../daos/users/UsersDAOMongo.js';
import { singupEmail } from '../templates/singupEmail.js';
import { logger } from '../config/index.js';

export const getAllUsers = async (limit, since) => {
	try {
		const allUsers = await Users.getAllUsers(limit, since);
		return allUsers;
	} catch (error) {
		logger.error(error);
	}
};

export const getUserById = async id => {
	try {
		const userById = await Users.getUserById(id);
		return userById;
	} catch (error) {
		logger.error(error);
	}
};

export const createNewUser = async (body, avatar) => {
	try {
		const savedUser = await Users.createNewUser(body, avatar);
		await singupEmail(body);
		return savedUser;
	} catch (error) {
		logger.error(error);
	}
};

export const createUserCart = async user => {
	try {
		const userCart = await Users.createUserCart(user);
		return userCart;
	} catch (error) {
		logger.error(error);
	}
};
