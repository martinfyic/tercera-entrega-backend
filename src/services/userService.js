import * as Users from '../daos/users/UsersDAOMongo.js';

export const getAllUsers = async (limit, since) => {
	const allUsers = await Users.getAllUsers(limit, since);
	return allUsers;
};

export const getUserById = async id => {
	const userById = await Users.getUserById(id);
	return userById;
};

export const createNewUser = async newUser => {
	const savedUser = await Users.createNewUser(newUser);
	return savedUser;
};

export const createUserCart = async user => {
	await Users.createUserCart(user);
};
