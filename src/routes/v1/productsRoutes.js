import express from 'express';
import * as authMiddleware from '../../middleware/authMiddleware.js';
import * as productController from '../../controllers/productController.js';

const v1ProdRouter = express.Router();

v1ProdRouter
	.get('/', productController.getAllProducts)
	.get('/:prodId', productController.getProductById)
	.post('/', authMiddleware.userRole, productController.createNewProduct)
	.put('/:prodId', authMiddleware.userRole, productController.upDateOneProduct)
	.delete(
		'/:prodId',
		authMiddleware.userRole,
		productController.deleteOneProduct
	);

export default v1ProdRouter;
