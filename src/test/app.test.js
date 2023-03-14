import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const URL = `http://localhost:8585`;
const id = '6406759bc3bb848e569e9759';
const idToDelete = '640fbfbec8caea591fa2db98';
const prodPost = {
	title: 'testPostMocha',
	price: 2500,
	description: 'test Description',
	stock: 3,
};
const prodPut = {
	price: 2300,
	stock: 15,
};

describe('Main suit Products', () => {
	it('getAllProducts debe traer todos los productos', done => {
		chai
			.request(URL)
			.get('/api/v1/productos')
			.end((err, res) => {
				expect(res.body.totalProducts).to.be.greaterThanOrEqual(1);
				expect(res).to.have.status(200);
				done();
			});
	});

	it('getProductById debe traer un producto', done => {
		chai
			.request(URL)
			.get(`/api/v1/productos/id/${id}`)
			.end((err, res) => {
				expect(res.body.title).to.be.exist;
				expect(res).to.have.status(200);
				done();
			});
	});

	it('createNewProduct debe crear un producto', done => {
		chai
			.request(URL)
			.post('/api/v1/productos')
			.send(prodPost)
			.end((err, res) => {
				expect(res).to.have.status(201);
				done();
			});
	});

	it('upDateOneProduct debe actualizar producto', done => {
		chai
			.request(URL)
			.put(`/api/v1/productos/id/${id}`)
			.send(prodPut)
			.end((err, res) => {
				expect(res.body.data.title).to.be.exist;
				expect(res).to.have.status(200);
				done();
			});
	});

	it('deleteOneProduct elimina producto', done => {
		chai
			.request(URL)
			.delete(`/api/v1/productos/id/${idToDelete}`)
			.end((err, res) => {
				expect(res).to.have.status(200);
				chai
					.request(URL)
					.get(`/api/v1/productos/id/${idToDelete}`)
					.end((err, res) => {
						expect(res.body.title).not.to.be.exist;
						expect(res).to.have.status(200);
						done();
					});
			});
	});
});
