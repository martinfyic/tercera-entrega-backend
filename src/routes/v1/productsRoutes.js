import { Router } from 'express';
import { check } from 'express-validator';
import * as productController from '../../controllers/productController.js';
import { productsUpload } from '../../middleware/multer.js';

const v1ProdRouter = Router();

v1ProdRouter
	.get('/', productController.getAllProducts)
	.get('/id/:prodId', productController.getProductById)
	.get('/carga', (req, res) => {
		res.render('uploadProducts');
	})
	.post(
		'/',
		check('_id', 'El ID no es valido').isMongoId(),
		check('title', 'El titulo es obligatorio').not().isEmpty(),
		check('price', 'El precio es obligatorio').not().isEmpty(),
		check('thumbnail', 'Thumbnail es obligatorio').not().isEmpty(),
		check('stock', 'Thumbnail es obligatorio').not().isEmpty(),
		[productsUpload.single('thumbnail')],
		productController.createNewProduct
	)
	.put('/id/:prodId', productController.upDateOneProduct)
	.delete('/id/:prodId', productController.deleteOneProduct);

export default v1ProdRouter;
