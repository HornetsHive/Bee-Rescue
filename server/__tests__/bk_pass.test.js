const request = require('supertest');

const server = request('http://localhost:3001');

describe("GET /bk_pass", () => {
    it("Should get Bob Beekeeper's password hash", async () => {
        const passFetch = {
            bk_id: 1,
        };
        const response = await server
            .get('/bk_pass')
            .send(emailFetch);
        expect(response.status).toBe(200);
    })
});