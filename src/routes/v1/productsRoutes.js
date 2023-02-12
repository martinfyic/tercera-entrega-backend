import express from 'express';
import * as productController from '../../controllers/productController.js';

const v1ProdRouter = express.Router();

v1ProdRouter
	.get('/', productController.getAllProducts)
	.get('/:prodId', productController.getProductById)
	.post('/', productController.createNewProduct)
	.put('/:prodId', productController.upDateOneProduct)
	.delete('/:prodId', productController.deleteOneProduct);

export default v1ProdRouter;
