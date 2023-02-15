import mongoos from 'mongoose';

const productsSchema = mongoos.Schema(
	{
		title: String,
		price: Number,
		thumbnail: String,
		description: String,
		stock: Number,
	},
	{ timestamps: true, versionKey: false }
);

const productsModel = mongoos.model('products', productsSchema);

export default productsModel;
