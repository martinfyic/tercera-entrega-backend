import * as Products from '../daos/products/ProductsDAOMongo.js';

export const getAllProducts = async (limit, since) => {
	const allProducts = await Products.getAllProducts(limit, since);
	return allProducts;
};

export const getProductById = async prodId => {
	const productById = await Products.getProductById(prodId);
	return productById;
};

export const createNewProduct = async (body, thumbnail) => {
	const savedProduct = await Products.createNewProduct(body, thumbnail);
	return savedProduct;
};

export const upDateOneProduct = (prodId, bodyUpdate) => {
	const upDatedProduct = Products.upDatedProduct(prodId, bodyUpdate);
	return upDatedProduct;
};

export const deleteOneProduct = async prodId => {
	const prodDeleted = await Products.deleteOneProduct(prodId);
	return prodDeleted;
};
