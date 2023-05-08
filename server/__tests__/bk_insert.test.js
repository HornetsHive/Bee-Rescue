const request = require('supertest');
require('dotenv').config();

const server = request('http://localhost:3001');

describe("POST /bk_insert", () => {
    it("Should create a new Beekeeper", async () => {
        const newBK = {
            email: "test@test.mail",
            pass: "test_password",
            key: process.env.KEY
        };
        const response = await server
            .post('/bk_insert')
            .send(newBK);
        expect(response.status).toBe(200);
    })
});