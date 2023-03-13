import axios from 'axios';
import { logger } from '../config/index.js';

export const getAllProdAxios = async () => {
	try {
		const URL = `http://localhost:8585/api/v1/productos`;
		const response = await axios.get(URL);
		console.log(response.data, response.status);
	} catch (error) {
		logger.error(`Error en test getAllProdAxios: ${error}`);
	}
};

export const getProdByIdAxios = async id => {
	try {
		const URL = `http://localhost:8585/api/v1/productos/id/${id}`;
		const response = await axios.get(URL);
		console.log(response.data, response.status);
	} catch (error) {
		logger.error(`Error en test getProdByIdAxios: ${error}`);
	}
};

export const createNewProdAxios = async (data, thumbnail) => {
	try {
		const URL = `http://localhost:8585/api/v1/productos`;
		const response = await axios.post(URL, data, thumbnail);
		console.log(response.status, response.data);
		console.log(`Producto actualizado`);
	} catch (error) {
		logger.error(`Error en test createNewProdAxios: ${error}`);
	}
};

export const upDateOneProductAxios = async (data, id) => {
	try {
		const URL = `http://localhost:8585/api/v1/productos/id/${id}`;
		const response = await axios.put(URL, data);
		console.log(response.status, response.data);
		console.log(`Producto cargado`);
	} catch (error) {
		logger.error(`Error en test upDateOneProductAxios: ${error}`);
	}
};

export const deleteOneProductAxios = async id => {
	try {
		const URL = `http://localhost:8585/api/v1/productos/id/${id}`;
		const response = await axios.delete(URL, id);
		console.log(response.status, response.data);
		console.log(`Producto eliminado`);
	} catch (error) {
		logger.error(`Error en test deleteOneProductAxios: ${error}`);
	}
};
