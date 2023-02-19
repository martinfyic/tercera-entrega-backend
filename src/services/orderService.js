import * as Orders from '../daos/orders/OrdersDAOMongo.js';
import { transporter } from '../config/nodemailer.js';
import { cartsModel } from '../schemas/index.js';

export const getAllOrders = async (limit, since) => {
	const allOrders = await Orders.getAllOrders(limit, since);
	return allOrders;
};

export const createNewOrder = async (idCart, user) => {
	const savedOrder = await Orders.createNewOrder(idCart);
	const cartBuy = await cartsModel.findById(idCart).lean();
	if (cartBuy === null) return { message: 'Carrito no encontrado' };

	let prodDetail = '';
	cartBuy.products.forEach(prod => {
		prodDetail += `
			<ul>
				<li>
					Producto: ${prod.title}
				</li>
				<li>
					Precio: $${prod.price}
				</li>
				<li>
					Cantidad: ${prod.quantity}
				</li>
				<li>
					Total: $${prod.quantity}
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
			<h4><strong>Nombre: </strong> ${user.name.first} ${user.name.last}</h4>
			<h4><strong>Nombre: </strong> ${user.name.first} ${user.name.last}</h4>
			<h4><strong>Fecha: </strong> ${cartBuy.createdAt}</h4>
			<h4><strong>Productis: </strong></h4>
			<div>${prodDetail}</div>
			<hr/>
			`,
	});

	return savedOrder;
};
