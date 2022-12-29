const productsModel = require('../../schemas/productsSchema');

const getAllProducts = async () => {
	const allProducts = await productsModel.find({});
	return allProducts;
};

const getProductById = async prodId => {
	const productById = await productsModel.findById(prodId).exec();
	if (productById === null)
		return {
			message: `El producto con Id: ${prodId} no existe`,
		};

	return productById;
};

const createNewProduct = async newProduct => {
	let isAlreadyAdded = await productsModel
		.findOne({ title: newProduct.title })
		.exec();
	if (isAlreadyAdded !== null)
		return {
			message: `Producto con nombre ${newProduct.title} ya creado`,
		};

	const saveNewProduct = new productsModel({
		_id: newProduct._id,
		title: newProduct.title,
		price: newProduct.price,
		thumbnail: newProduct.thumbnail,
		description: newProduct.description,
		stock: newProduct.stock,
	});

	await saveNewProduct.save();
	return {
		message: 'Producto guardado',
		data: saveNewProduct,
	};
};

const upDatedProduct = async (prodId, bodyUpdate) => {
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

const deleteOneProduct = async prodId => {
	let productUpdateExist = await productsModel.findById(prodId).exec();
	if (productUpdateExist === null) {
		return { message: `Producto Id: ${prodId} no encontrado` };
	}

	await productsModel.findByIdAndDelete(prodId);
	return { message: `Producto Id: ${prodId} eliminado` };
};

module.exports = {
	getAllProducts,
	getProductById,
	createNewProduct,
	upDatedProduct,
	deleteOneProduct,
};
