const request = require('supertest');
require('dotenv').config();

const server = request('http://localhost:3001');

describe("GET /bk_user", () => {
    it("Should get Bob Beekeeper's email/bk_id", async () => {
        const emailFetch = {
            email: "bb@b.com",
            key: process.env.KEY
        };
        const response = await server
            .get('/bk_user')
            .send(emailFetch);
        expect(response.status).toBe(200);
    })
});