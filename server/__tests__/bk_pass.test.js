const request = require('supertest');
require('dotenv').config();

const server = request('http://localhost:3001');

describe("GET /bk_pass", () => {
    it("Should get Bob Beekeeper's password hash", async () => {
        const passFetch = {
            bk_id: 1,
            key: process.env.KEY
        };
        const response = await server
            .get('/bk_pass')
            .send(passFetch);
        expect(response.status).toBe(200);
    })
});