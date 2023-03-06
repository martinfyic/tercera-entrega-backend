import * as userService from '../services/userService.js';
import { logger } from '../config/index.js';

export const getAllUsers = async (req, res) => {
	try {
		const { limit, since } = req.query;

		const allUsers = await userService.getAllUsers(limit, since);
		return res.status(200).send({ status: 'OK', data: allUsers });
	} catch (error) {
		logger.error(error);
	}
};

export const getUserById = async (req, res) => {
	try {
		const { id } = req.params;

		const userById = await userService.getUserById(id);
		return res.status(200).send({ status: 'OK', data: userById });
	} catch (error) {
		logger.error(error);
	}
};

export const createNewUser = async (req, res) => {
	try {
		const { body } = req;
		const userImage = req.file ? req.file.filename : 'default-image.png';
		const avatar = `${req.protocol}://${req.get('host')}/avatar/${userImage}`;

		await userService.createNewUser(body, avatar);

		res.redirect('/users/login');
	} catch (error) {
		logger.error(error);
	}
};

export const singUpUser = (req, res) => {
	try {
		if (req.isAuthenticated()) return res.redirect('/users/menu');
		res.render('signup', { title: '⚡ Signup' });
	} catch (error) {
		logger.error(error);
	}
};

export const loginUser = (req, res) => {
	try {
		if (req.isAuthenticated()) return res.redirect('/users/menu');
		res.render('login', { title: '⚡ Login' });
	} catch (error) {
		logger.error(error);
	}
};

export const userMenu = async (req, res) => {
	try {
		const user = req.user;
		const userCart = await userService.createUserCart(user);
		res.status(200).render('userMenu', {
			title: '⚡ User Menu',
			user,
			userCart,
		});
	} catch (error) {
		logger.error(error);
	}
};

export const userLogOut = (req, res) => {
	try {
		req.logout(err => {
			if (err) return err;
			res.redirect('/users/login');
		});
	} catch (error) {
		logger.error(error);
	}
};

export const loginError = (req, res) => {
	try {
		if (req.isAuthenticated()) return res.redirect('/users/menu');
		res.render('error-login', { title: '⚠️ Error en login' });
	} catch (error) {
		logger.error(error);
	}
};
