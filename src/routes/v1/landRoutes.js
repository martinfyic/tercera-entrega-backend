import { Router } from 'express';

const landRouter = Router();

landRouter.get('/', (req, res) => {
	res.render('landing');
});

export default landRouter;
