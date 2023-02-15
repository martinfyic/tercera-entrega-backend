import express from 'express';
import * as productController from '../../controllers/productController.js';
import { productsUpload } from '../../middleware/multer.js';

const v1ProdRouter = express.Router();

v1ProdRouter
	.get('/', productController.getAllProducts)
	.get('/id/:prodId', productController.getProductById)
	.get('/carga', (req, res) => {
		res.render('uploadProducts');
	})
	.post(
		'/',
		productsUpload.single('thumbnail'),
		productController.createNewProduct
	)
	.put('/id/:prodId', productController.upDateOneProduct)
	.delete('/id/:prodId', productController.deleteOneProduct);

export default v1ProdRouter;
