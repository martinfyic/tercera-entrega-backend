const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const v1ProdRouter = require('./routes/v1/productsRoutes');
const v1CartRouter = require('./routes/v1/cartRoutes');
const error404 = require('./middleware/error404');
const { dbConnect } = require('./config/MongoConnect');

const PORT = process.env.PORT || 8080;

const app = express();

app
	.use(express.json())
	.use(express.urlencoded({ extended: true }))
	.use('/api/v1/productos', v1ProdRouter)
	.use('/api/v1/carrito', v1CartRouter)
	.use(error404);

const connection = async () => {
	await dbConnect();
	const serverOn = app.listen(PORT, () => {
		console.log(
			`***** 🚀 Servidor funcionando en http://localhost:${PORT} *****`
		);
	});
	serverOn.on('error', err => {
		console.log(`⚠️ Error en el servidor ===> ${err}`);
	});
};

connection();
