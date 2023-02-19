import { Router } from 'express';
import * as orderController from '../../controllers/orderController.js';

const v1OrderRouter = Router();

v1OrderRouter
	.get('/', orderController.getAllOrders)
	.post('/', orderController.createNewOrder);

export default v1OrderRouter;
