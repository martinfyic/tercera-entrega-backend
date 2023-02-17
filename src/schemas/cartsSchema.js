import mongoos from 'mongoose';

const cartsSchema = mongoos.Schema(
	{
		products: Array,
		name: { type: String, required: true },
		lastname: { type: String, required: true },
		userId: { type: String, required: true },
	},
	{ timestamps: true, versionKey: false }
);

const cartsModel = mongoos.model('carts', cartsSchema);

export default cartsModel;
