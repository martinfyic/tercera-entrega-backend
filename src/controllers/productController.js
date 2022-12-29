const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
	const allProducts = await productService.getAllProducts();
	res.status(200).send({ status: 'OK', data: allProducts });
};

const getProductById = async (req, res) => {
	const { prodId } = req.params;
	const productById = await productService.getProductById(prodId);
	res.status(200).send({ status: 'OK', data: productById });
};

const createNewProduct = async (req, res) => {
	const { body } = req;

	const newProduct = {
		title: body.title,
		price: body.price,
		thumbnail: body.thumbnail,
		description: body.description,
		stock: body.stock,
	};

	if (
		!body.title ||
		!body.price ||
		!body.thumbnail ||
		!body.description ||
		!body.stock
	) {
		res.status(400).send({
			status: 'Bad Request',
			message: 'Falta informacion verifique',
			data: newProduct,
		});
	} else {
		const createdProduct = await productService.createNewProduct(newProduct);
		res.status(201).send({ status: 'ok', data: createdProduct });
	}
};

const upDateOneProduct = async (req, res) => {
	const { prodId } = req.params;
	const { body } = req;
	if (!prodId) return;

	const updatedProduct = await productService.upDateOneProduct(prodId, body);
	res.send({ status: 'ok', data: updatedProduct });
};

const deleteOneProduct = async (req, res) => {
	const { prodId } = req.params;
	if (!prodId) return;
	const prodDeleted = await productService.deleteOneProduct(prodId);
	res.status(200).send(prodDeleted);
};

module.exports = {
	getAllProducts,
	getProductById,
	createNewProduct,
	upDateOneProduct,
	deleteOneProduct,
};
