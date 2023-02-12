import * as userService from '../services/userService.js';

export const getAllUsers = async (req, res) => {
	const { limit, since } = req.query;

	const allUsers = await userService.getAllUsers(limit, since);
	return res.status(200).send({ status: 'OK', data: allUsers });
};

export const getUserById = async (req, res) => {
	const { id } = req.params;

	const userById = await userService.getUserById(id);
	return res.status(200).send({ status: 'OK', data: userById });
};

export const createNewUser = async (req, res) => {
	const { body } = req;
	const avatar = req.file ? req.file.filename : '';

	const newUser = {
		name: {
			first: body.first,
			last: body.last,
		},
		email: body.email,
		password: body.password,
		avatar: avatar,
		phone: body.phone,
		address: {
			street: body.street,
			streetNum: body.streetNum,
			departmentNum: body.departmentNum,
		},
		age: body.age,
	};

	if (
		!body.first ||
		!body.last ||
		!body.email ||
		!body.password ||
		!body.phone ||
		!body.street ||
		!body.streetNum ||
		!body.departmentNum ||
		!body.age
	) {
		return res.status(400).send({
			status: 'Bad Request',
			message: 'Falta informacion, campos obligatorios',
			data: newUser,
		});
	} else {
		try {
			await userService.createNewUser(newUser);
			res.redirect('users/login');
		} catch (error) {
			throw error;
		}
	}
};
