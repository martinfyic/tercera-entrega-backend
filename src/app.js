import 'dotenv/config';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import dbConnect from './config/MongoConnect.js';
import {
	v1CartRouter,
	v1LandRouter,
	v1OrderRouter,
	v1ProdRouter,
	v1UserRouter,
} from './routes/v1/index.js';
import { error404, strategyLogin, isAuth } from './middleware/index.js';

const PORT = process.env.PORT || 8080;

const app = express();

passport.use('login', strategyLogin);

app.use(
	session({
		secret: process.env.PASSPORT_SECRET,
		cookie: {
			httpOnly: false,
			secure: false,
			maxAge: 600000,
		},
		rolling: true,
		resave: true,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app
	.use(express.json())
	.use(cors())
	.use(express.urlencoded({ extended: true }))
	.use(express.static('public'))
	.use('/image', express.static('./public/uploads/products'))
	.use('/avatar', express.static('./public/uploads/userAvatar'))
	.set('view engine', 'ejs')
	.set('views', 'public')
	.use('/', v1LandRouter)
	.use('/users', v1UserRouter)
	.use('/api/v1/productos', isAuth, v1ProdRouter)
	.use('/api/v1/carrito', isAuth, v1CartRouter)
	.use('/api/v1/ordenes', v1OrderRouter)
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
