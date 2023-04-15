const request = require('supertest');

const server = request('http://localhost:3001');

describe("GET /bk_get", () => {
    it("Should get Bob Beekeeper's beekeeper info", async () => {
        const bkInfo = {
            email: "bb@b.com",
            pass: "TestPassword",
        };
        const response = await server
            .get('/bk_get')
            .send(bkInfo);
        expect(response.status).toBe(200);
    })
});