const mongoose = require('mongoose');

const dbConnect = () => {
	const MONGODB_URL = process.env.MONGODB_URL;
	mongoose.connect(
		MONGODB_URL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		err => {
			!err
				? console.log('***** CONECTADO A MONGODB ✅ *****')
				: console.log('***** ERROR EN CONEXION A DB ⚠️ *****');
		}
	);
};

module.exports = { dbConnect };
