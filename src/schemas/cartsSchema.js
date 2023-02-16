import mongoos from 'mongoose';

const cartsSchema = mongoos.Schema(
	{
		products: Array,
	},
	{ timestamps: true, versionKey: false }
);

const cartsModel = mongoos.model('carts', cartsSchema);

export default cartsModel;
