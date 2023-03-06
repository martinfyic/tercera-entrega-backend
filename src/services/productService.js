import * as Products from '../daos/products/ProductsDAOMongo.js';
import { logger } from '../config/index.js';

export const getAllProducts = async (limit, since) => {
	try {
		const allProducts = await Products.getAllProducts(limit, since);
		return allProducts;
	} catch (error) {
		logger.error(error);
	}
};

export const getProductById = async prodId => {
	try {
		const productById = await Products.getProductById(prodId);
		return productById;
	} catch (error) {
		logger.error(error);
	}
};

export const createNewProduct = async (body, thumbnail) => {
	try {
		const savedProduct = await Products.createNewProduct(body, thumbnail);
		return savedProduct;
	} catch (error) {
		logger.error(error);
	}
};

export const upDateOneProduct = (prodId, bodyUpdate) => {
	try {
		const upDatedProduct = Products.upDatedProduct(prodId, bodyUpdate);
		return upDatedProduct;
	} catch (error) {
		logger.error(error);
	}
};

export const deleteOneProduct = async prodId => {
	try {
		const prodDeleted = await Products.deleteOneProduct(prodId);
		return prodDeleted;
	} catch (error) {
		logger.error(error);
	}
};
