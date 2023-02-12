import { Router } from 'express';
import { upload } from '../../middleware/multer.js';
import * as userController from '../../controllers/userController.js';

const v1UserRouter = Router();

v1UserRouter
	.get('/', userController.getAllUsers)
	.get('/id/:id', userController.getUserById)
	.get('/signup', (req, res) => {
		res.render('signup');
	})
	.post('/', upload.single('avatar'), userController.createNewUser)
	.get('/login', (req, res) => {
		res.render('login');
	});

export default v1UserRouter;
