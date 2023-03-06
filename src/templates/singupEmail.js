import { transporter } from '../config/nodemailer.js';

export const singupEmail = async body => {
	const email = await transporter.sendMail({
		from: `"Nodemailer ⚡" <${process.env.NODEMAILER_EMAIL}>`,
		to: `${process.env.NODEMAILER_EMAIL_ADMIN}`,
		subject: 'Nuevo registro en DB ✔',
		html: `
			<h1>Nuevo registro en DB 🔥</h1>
			<hr/>
			<h3>Informacion:</h3>
			<ul>
				<li>
					<p><strong>Nombre:</strong> ${body.first}</p>
				</li>
				<li>
					<strong>Apellido:</strong> ${body.last}</p>
				</li>
				<li>
					<strong>Edad:</strong> ${body.age}</p>
				</li>
				<li>
					<strong>Email:</strong> ${body.email}</p>
				</li>
				<li>
					<strong>Telefono:</strong> ${body.phone}</p>
				</li>
				<li>
					<strong>Calle:</strong> ${body.street}</p>
				</li>
				<li>
					<strong>Numero de calle:</strong> ${body.streetNum}</p>
				</li>
				<li>
					<strong>Numero de Apartamento:</strong> ${body.departmentNum}</p>
				</li>
			</ul>
			<hr/>
			`,
	});

	return email;
};
