import * as Users from '../daos/users/UsersDAOMongo.js';
import { transporter } from '../config/nodemailer.js';

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

	await transporter.sendMail({
		from: `"Nodemailer ⚡" <${process.env.NODEMAILER_EMAIL}>`,
		to: `${process.env.NODEMAILER_EMAIL_ADMIN}`,
		subject: 'Nuevo registro en DB ✔',
		html: `
			<h1>Nuevo registro en DB 🔥</h1>
			<hr/>
			<h3>Informacion:</h3>
			<ul>
				<li>
					<p><strong>Nombre:</strong> ${newUser.name.first}</p>
				</li>
				<li>
					<strong>Apellido:</strong> ${newUser.name.last}</p>
				</li>
				<li>
					<strong>Edad:</strong> ${newUser.age}</p>
				</li>
				<li>
					<strong>Email:</strong> ${newUser.email}</p>
				</li>
				<li>
					<strong>Telefono:</strong> ${newUser.phone}</p>
				</li>
				<li>
					<strong>Calle:</strong> ${newUser.address.street}</p>
				</li>
				<li>
					<strong>Numero de calle:</strong> ${newUser.address.streetNum}</p>
				</li>
				<li>
					<strong>Numero de Apartamento:</strong> ${newUser.address.departmentNum}</p>
				</li>
			</ul>
			<hr/>
			`,
	});

	return savedUser;
};

export const createUserCart = async user => {
	await Users.createUserCart(user);
};
