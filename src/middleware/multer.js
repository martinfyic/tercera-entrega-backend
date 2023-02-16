import multer from 'multer';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));
const mimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];

export const upload = multer({
	storage: multer.diskStorage({
		destination: join(currentDir, '../../public/uploads/userAvatar'),
		filename: (req, file, cb) => {
			const fileExtension = extname(file.originalname);
			//TODO ver si no tiene la extencion ponerle a mano
			//? mimetype: 'image/jpeg' --> ver separar split <============!!

			const fileName = file.originalname.split(fileExtension)[0];

			cb(null, `${fileName}-${Date.now()}${fileExtension}`);
		},
	}),
	fileFilter: (req, file, cb) => {
		if (mimeTypes.includes(file.mimetype)) cb(null, true);
		else
			cb(
				new Error(`El formato de las imagenes debe ser ${mimeTypes.join(' ')}`)
			);
	},
	limits: {
		fieldSize: 10000000,
	},
});

export const productsUpload = multer({
	storage: multer.diskStorage({
		destination: join(currentDir, '../../public/uploads/products'),
		filename: (req, file, cb) => {
			const fileExtension = extname(file.originalname);
			//TODO ver si no tiene la extencion ponerle a mano
			//? mimetype: 'image/jpeg' --> ver separar split <============!!

			const fileName = file.originalname.split(fileExtension)[0];

			cb(null, `${fileName}-${Date.now()}${fileExtension}`);
		},
	}),
	fileFilter: (req, file, cb) => {
		if (mimeTypes.includes(file.mimetype)) cb(null, true);
		else
			cb(
				new Error(`El formato de las imagenes debe ser ${mimeTypes.join(' ')}`)
			);
	},
	limits: {
		fieldSize: 10000000,
	},
});
