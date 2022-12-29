const mongoos = require('mongoose');

const cartsSchema = mongoos.Schema(
	{
		_id: String,
		products: Array,
	},
	{ timestamps: true, versionKey: false }
);

const cartsModel = mongoos.model('carts', cartsSchema);

module.exports = cartsModel;
