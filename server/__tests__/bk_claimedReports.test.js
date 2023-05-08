const request = require('supertest');
require('dotenv').config();

const server = request('http://localhost:3001');

describe("GET /bk_claimedReports", () => {
    it("Should get Bob Beekeeper's claimed reports", async () => {
        const bkInfo = {
            bk_id: 1,
            key: process.env.KEY
        };
        const response = await server
            .get('/bk_claimedReports')
            .send(bkInfo);
        expect(response.status).toBe(200);
    })
});