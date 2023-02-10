const error404 = (req, res) => {
	res.status(404).send({
		status: '404 | Not Found',
		host: req.hostname,
		message: `Ruta: ${req.url} methodo ${req.method} no implementada`,
	});
};

export default error404;
