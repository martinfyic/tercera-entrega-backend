const error404 = (req, res) => {
	res.status(404).send({
		status: 'Error 404',
		host: req.hostname,
		message: `Ruta: ${req.url} methodo ${req.method} no implementada`,
	});
};

export default error404;
