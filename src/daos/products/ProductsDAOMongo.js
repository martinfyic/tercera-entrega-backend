import { productFormatSchemaDTO } from '../../dto/Product/ProductsDTO.js';
import { productsModel } from '../../schemas/index.js';

export const getAllProducts = async (limit = 10, since = 0) => {
	const allProducts = await productsModel
		.find({})
		.limit(Number(limit))
		.skip(Number(since));
	const totalProducts = await productsModel.countDocuments({});
	return {
		totalProducts,
		allProducts,
	};
};

export const getProductById = async prodId => {
	const productById = await productsModel.findById(prodId).exec();
	if (productById === null)
		return {
			message: `El producto con Id: ${prodId} no existe`,
		};

	return productById;
};

export const createNewProduct = async (body, thumbnail) => {
	let isAlreadyAdded = await productsModel
		.findOne({ title: body.title })
		.exec();
	if (isAlreadyAdded !== null)
		return {
			message: `Producto con nombre ${body.title} ya creado`,
		};

	const saveNewProduct = productFormatSchemaDTO(body, thumbnail);

	await saveNewProduct.save();
	return {
		message: 'Producto guardado',
		data: saveNewProduct,
	};
};

export const upDatedProduct = async (prodId, bodyUpdate) => {
	let productUpdateExist = await productsModel.findById(prodId).exec();
	if (productUpdateExist === null)
		return { message: `Producto Id: ${prodId} no encontrado` };

	let prodUpdated = {
		...productUpdateExist._doc,
		...bodyUpdate,
	};
	productUpdateExist = prodUpdated;

	await productsModel.findByIdAndUpdate(prodId, { ...productUpdateExist });
	return {
		message: `Producto Id: ${prodId} actualizado`,
		data: productUpdateExist,
	};
};

export const deleteOneProduct = async prodId => {
	let productUpdateExist = await productsModel.findById(prodId).exec();
	if (productUpdateExist === null) {
		return { message: `Producto Id: ${prodId} no encontrado` };
	}

	await productsModel.findByIdAndDelete(prodId);
	return { message: `Producto Id: ${prodId} eliminado` };
};
