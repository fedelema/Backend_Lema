const supertest = require("supertest")
const agent = supertest("http://localhost:8080");
const chai = require("chai");
const expect = chai.expect

describe("Test Productos endpoints", () => {
    let producto;
    beforeEach(()=> {
        producto = {
            nombre: "Vino",
            descripcion: "Botella Vino",
            precio: 1500,
            foto: "https://cdn1.iconfinder.com/data/icons/drink-beverage/512/22-wine-drink-bottle-glass-128.png",
            stock: 10
        }
    });

    it("Deberia traer un producto", async () => {
        let response = await agent.get('/api/productos')
        expect(response.status).to.eql(200);
    });

    it("Deberia agregar un nuevo producto", async () => {
        let response = await agent.post('/api/productos')
            .send(producto);
    
        const body = response.body;
        expect(response.status).to.eql(200);
        expect(body).to.include.keys('nombre', 'descripcion', 'precio', 'foto', 'stock');
    });
});