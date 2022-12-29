const userRole = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(403).send({
			status: 'Error',
			description: 'No autorizado',
			message: `Ruta ${req.url} metodo: ${req.method} no autrizado`,
		});
	}

	next();
};

module.exports = {
	userRole,
};
