import { Router } from 'express';
import passport from 'passport';
import { upload } from '../../middleware/multer.js';
import * as userController from '../../controllers/userController.js';
import { isAuth } from '../../middleware/isAuth.js';

const v1UserRouter = Router();

v1UserRouter
	.get('/', isAuth, userController.getAllUsers)
	.get('/id/:id', isAuth, userController.getUserById)
	.get('/signup', userController.singUpUser)
	.post('/signup', upload.single('avatar'), userController.createNewUser)
	.get('/login', userController.loginUser)
	.post(
		'/login',
		passport.authenticate('login', {
			failureRedirect: '/users/error-login',
		}),
		(req, res) => {
			res.redirect('/users/menu');
		}
	)
	.get('/logout', isAuth, userController.userLogOut)
	.get('/menu', isAuth, userController.userMenu);

v1UserRouter.get('/error-login', userController.loginError);

export default v1UserRouter;
