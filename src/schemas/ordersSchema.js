import mongoos from 'mongoose';

const ordersSchema = mongoos.Schema(
	{
		number: { type: String, required: true },
		delivered: { type: Boolean, required: true, default: false },
		user: { type: String, required: true },
		address: { type: String, required: true },
		products: { type: Array, required: true },
	},
	{ timestamps: true, versionKey: false }
);

const ordersModel = mongoos.model('orders', ordersSchema);

export default ordersModel;
