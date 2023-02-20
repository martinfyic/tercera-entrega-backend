import mongoos from 'mongoose';

const ordersSchema = mongoos.Schema(
	{
		delivered: { type: Boolean, default: false },
		user: {
			firstName: { type: String, required: true },
			lastName: { type: String, required: true },
		},
		userId: { type: String, required: true },
		address: {
			street: { type: String, required: true },
			streetNum: { type: Number, required: true },
			departmentNum: { type: Number, required: true },
		},
		products: { type: Array, required: true },
	},
	{ timestamps: true, versionKey: false }
);

const ordersModel = mongoos.model('orders', ordersSchema);

export default ordersModel;
