import mongoose from 'mongoose';
import { logger } from './index.js';

export const dbConnect = () => {
	const MONGODB_URL = process.env.MONGODB_URL;
	mongoose.connect(
		MONGODB_URL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		err => {
			!err
				? logger.info('***** CONECTADO A MONGODB ✅ *****')
				: logger.error('***** ERROR EN CONEXION A DB ⚠️ *****');
		}
	);
};
