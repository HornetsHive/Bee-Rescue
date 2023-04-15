const request = require('supertest');

const server = request('http://localhost:3001');

describe("GET /bk_user", () => {
    it("Should get Bob Beekeeper's email/bk_id", async () => {
        const emailFetch = {
            email: "bb@b.com",
        };
        const response = await server
            .get('/bk_user')
            .send(emailFetch);
        expect(response.status).toBe(200);
    })
});