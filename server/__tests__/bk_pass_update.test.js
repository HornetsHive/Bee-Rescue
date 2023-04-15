const request = require('supertest');

const server = request('http://localhost:3001');

describe("POST /bk_pass_update", () => {
    it("Should update Bob Beekeeper's password", async () => {
        const passUpdate = {
            pass: "TestPass",
            bk_id: 1,
        };
        const response = await server
            .post('/bk_pass_update')
            .send(passUpdate);
        expect(response.status).toBe(200);
    })
});