import { Schema, model } from 'mongoose';

const addressSchema = new Schema({
	street: {
		type: String,
		required: true,
	},
	streetNum: {
		type: Number,
		required: true,
	},
	departmentNum: {
		type: Number,
		required: true,
	},
});

const nameSchema = new Schema({
	first: {
		type: String,
		required: true,
	},
	last: {
		type: String,
		required: true,
	},
});

const userSchema = Schema(
	{
		name: {
			type: nameSchema,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		img: {
			type: String,
		},
		phone: {
			type: Number,
			required: true,
		},
		address: {
			type: addressSchema,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true, versionKey: false }
);

const userModel = model('users', userSchema);

export default userModel;
