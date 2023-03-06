import { transporter } from '../config/index.js';

export const orderEmail = async (savedOrder, user) => {
	let prodDetail = '';
	savedOrder.products.forEach(prod => {
		prodDetail += `
			<ul>
				<li>
					<strong>Producto: </strong>${prod.title}
				</li>
				<li>
					<strong>Precio: </strong>$${prod.price}
				</li>
				<li>
					<strong>Cantidad: </strong>${prod.quantity}
				</li>
				<li>
					<strong>Total: </strong>$${prod.quantity}
				</li>
			</ul>`;
	});

	await transporter.sendMail({
		from: `"Nodemailer ⚡" <${process.env.NODEMAILER_EMAIL}>`,
		to: `${process.env.NODEMAILER_EMAIL_ADMIN}`,
		subject: 'Nuevo pedido 🤑',
		html: `
			<h1>Nuevo pedido 🔥</h1>
			<hr/>
			<h3>Informacion:</h3>
			<h4><strong>Nro de Orden: </strong> ${savedOrder._id}</h4>
			<h4><strong>Nombre: </strong> ${user.name.first} ${user.name.last}</h4>
			<h4><strong>Id usuario: </strong> ${savedOrder.userId}</h4>
			<h4><strong>Fecha: </strong> ${savedOrder.createdAt}</h4>
			<h4><strong>Productos: </strong></h4>
			<div>${prodDetail}</div>
			<hr/>
			`,
	});
};
