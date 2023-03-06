import * as productService from '../services/productService.js';
import { cartsModel } from '../schemas/index.js';

export const getAllProducts = async (req, res) => {
	const { limit, since } = req.query;
	const products = await productService.getAllProducts(limit, since);
	const { user } = req;
	const userCart = await cartsModel.findOne({ userId: user._id });
	res.render('allProducts', {
		title: '⚡ Productos',
		products: products.allProducts,
		userCart: userCart._id,
	});
};

export const getProductById = async (req, res) => {
	const { prodId } = req.params;
	const { user } = req;
	const userCart = await cartsModel.findOne({ userId: user._id });
	const productById = await productService.getProductById(prodId);
	res.render('productById', {
		title: '⚡ Producto',
		productById,
		userCart: userCart._id,
	});
};

export const createNewProduct = async (req, res) => {
	const { body } = req;
	const prodImg = req.file ? req.file.filename : '';
	const thumbnail = `${req.protocol}://${req.get('host')}/image/${prodImg}`;

	if (
		!body.title ||
		!body.price ||
		!thumbnail ||
		!body.description ||
		!body.stock
	) {
		res.status(400).send({
			status: 'Bad Request',
			message: 'Falta informacion verifique',
		});
	} else {
		await productService.createNewProduct(body, thumbnail);
		res.status(201).redirect('/api/v1/productos/carga');
	}
};

export const upDateOneProduct = async (req, res) => {
	const { prodId } = req.params;
	const { body } = req;
	if (!prodId) return;

	const updatedProduct = await productService.upDateOneProduct(prodId, body);
	res.send({ status: 'ok', data: updatedProduct });
};

export const deleteOneProduct = async (req, res) => {
	const { prodId } = req.params;
	if (!prodId) return;
	const prodDeleted = await productService.deleteOneProduct(prodId);
	res.status(200).send(prodDeleted);
};
