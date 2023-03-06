import { productFormatSchemaDTO } from '../../dto/Product/ProductsDTO.js';
import { productsModel } from '../../schemas/index.js';
import { logger } from '../../config/index.js';

export const getAllProducts = async (limit = 10, since = 0) => {
	try {
		const allProducts = await productsModel
			.find({})
			.limit(Number(limit))
			.skip(Number(since));
		const totalProducts = await productsModel.countDocuments({});
		return {
			totalProducts,
			allProducts,
		};
	} catch (error) {
		logger.error(error);
	}
};

export const getProductById = async prodId => {
	try {
		const productById = await productsModel.findById(prodId).exec();
		if (productById === null)
			return {
				message: `El producto con Id: ${prodId} no existe`,
			};

		return productById;
	} catch (error) {
		logger.error(error);
	}
};

export const createNewProduct = async (body, thumbnail) => {
	try {
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
	} catch (error) {
		logger.error(error);
	}
};

export const upDatedProduct = async (prodId, bodyUpdate) => {
	try {
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
	} catch (error) {
		logger.error(error);
	}
};

export const deleteOneProduct = async prodId => {
	try {
		let productUpdateExist = await productsModel.findById(prodId).exec();
		if (productUpdateExist === null) {
			return { message: `Producto Id: ${prodId} no encontrado` };
		}

		await productsModel.findByIdAndDelete(prodId);
		return { message: `Producto Id: ${prodId} eliminado` };
	} catch (error) {
		logger.error(error);
	}
};
