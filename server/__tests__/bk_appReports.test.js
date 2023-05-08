const request = require('supertest');
require('dotenv').config();

const server = request('http://localhost:3001');

describe("GET /bk_appReports", () => {
    it("Should fetch all active reports", async () => {
        const response = await server
            .get('/bk_appReports')
            .send(process.env.KEY);
        expect(response.status).toBe(200);
    })
});