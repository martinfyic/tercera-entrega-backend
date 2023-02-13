import * as userService from '../services/userService.js';
import { transporter } from '../config/nodemailer.js';

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

			await transporter.sendMail({
				from: `"Nodemailer ⚡" <${process.env.NODEMAILER_EMAIL}>`,
				to: `${process.env.NODEMAILER_EMAIL_ADMIN}`,
				subject: 'Nuevo registro en DB ✔',
				html: `
					<h1>Nuevo registro en DB</h1>
					<hr/>
					<h3>Informacion:</h3>
						<ul>
							<li>
								<strong>Nombre: ${body.first}</strong>
							</li>
							<li>
								<strong>Apellido: ${body.last}</strong>
							</li>
							<li>
								<strong>Edad: ${body.age}</strong>
							</li>
							<li>
								<strong>Email: ${body.email}</strong>
							</li>
							<li>
								<strong>Telefono: ${body.phone}</strong>
							</li>
							<li>
								<strong>Calle: ${body.street}</strong>
							</li>
							<li>
								<strong>Numero de calle: ${body.streetNum}</strong>
							</li>
							<li>
								<strong>Numero de Apartamento: ${body.departmentNum}</strong>
							</li>
						</ul>
					`,
			});

			res.redirect('/users/login');
		} catch (error) {
			throw error;
		}
	}
};

export const singUpUser = (req, res) => {
	if (req.isAuthenticated()) return res.redirect('/users/menu');
	res.render('signup');
};

export const loginUser = (req, res) => {
	if (req.isAuthenticated()) return res.redirect('/users/menu');
	res.render('login');
};

export const userMenu = (req, res) => {
	const user = req.user;
	res.status(200).render('userMenu', { user });
};

export const userLogOut = (req, res) => {
	req.logout(err => {
		if (err) return err;
		res.redirect('/users/login');
	});
};

export const loginError = (req, res) => {
	if (req.isAuthenticated()) return res.redirect('/users/menu');
	res.render('error-login');
};
