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
	const avatar = req.file ? req.file.filename : 'default-image.png';

	const newUser = {
		name: {
			first: body.first,
			last: body.last,
		},
		email: body.email,
		password: body.password,
		avatar: `${req.protocol}://${req.get('host')}/avatar/${avatar}`,
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

			res.redirect('/users/login');
		} catch (error) {
			throw error;
		}
	}
};

export const singUpUser = (req, res) => {
	if (req.isAuthenticated()) return res.redirect('/users/menu');
	res.render('signup', { title: '⚡ Signup' });
};

export const loginUser = (req, res) => {
	if (req.isAuthenticated()) return res.redirect('/users/menu');
	res.render('login', { title: '⚡ Login' });
};

export const userMenu = async (req, res) => {
	const user = req.user;
	const userCart = await userService.createUserCart(user);

	res.status(200).render('userMenu', {
		title: '⚡ User Menu',
		user,
		userCart,
	});
};

export const userLogOut = (req, res) => {
	req.logout(err => {
		if (err) return err;
		res.redirect('/users/login');
	});
};

export const loginError = (req, res) => {
	if (req.isAuthenticated()) return res.redirect('/users/menu');
	res.render('error-login', { title: '⚠️ Error en login' });
};
