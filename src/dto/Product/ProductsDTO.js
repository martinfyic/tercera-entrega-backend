import { productsModel } from '../../schemas/index.js';

export const productFormatSchemaDTO = (body, thumbnail) => {
	const saveNewProduct = new productsModel({
		title: body.title,
		price: body.price,
		thumbnail: thumbnail,
		description: body.description,
		stock: body.stock,
	});

	return saveNewProduct;
};
