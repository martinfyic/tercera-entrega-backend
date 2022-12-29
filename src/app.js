console.clear();
import 'dotenv/config';
import express from 'express';
import v1ProdRouter from './routes/v1/productsRoutes.js';
import v1CartRouter from './routes/v1/cartRoutes.js';
import error404 from './middleware/error404.js';
import dbConnect from './config/MongoConnect.js';

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
		console.log(`⚠️ Error en el servidor ===> ${err?.message}`);
	});
};

connection();
