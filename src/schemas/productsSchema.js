import mongoos from 'mongoose';

const productsSchema = mongoos.Schema(
	{
		_id: String,
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
