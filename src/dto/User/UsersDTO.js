import { userModel } from '../../schemas/index.js';

export const userFormatSchemaDTO = (body, avatar) => {
	const saveNewUser = new userModel({
		name: {
			first: body.first,
			last: body.last,
		},
		email: body.email,
		password: body.password,
		avatar: avatar,
		phone: body.phone,
		address: {
			street: body.street,
			streetNum: body.streetNum,
			departmentNum: body.departmentNum,
		},
		age: body.age,
	});

	return saveNewUser;
};
