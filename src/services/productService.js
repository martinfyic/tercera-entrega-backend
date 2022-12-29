const { v4: uuidv4 } = require('uuid');
const Products = require('../daos/products/ProductsDAOMongo');

const getAllProducts = async () => {
	const allProducts = await Products.getAllProducts();
	return allProducts;
};

const getProductById = async prodId => {
	const productById = await Products.getProductById(prodId);
	return productById;
};

const createNewProduct = async newProduct => {
	const productToSave = {
		...newProduct,
		_id: uuidv4(),
	};

	const savedProduct = await Products.createNewProduct(productToSave);
	return savedProduct;
};

const upDateOneProduct = (prodId, bodyUpdate) => {
	const upDatedProduct = Products.upDatedProduct(prodId, bodyUpdate);
	return upDatedProduct;
};

const deleteOneProduct = async prodId => {
	const prodDeleted = await Products.deleteOneProduct(prodId);
	return prodDeleted;
};

module.exports = {
	getAllProducts,
	getProductById,
	createNewProduct,
	upDateOneProduct,
	deleteOneProduct,
};
