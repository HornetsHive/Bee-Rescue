const request = require('supertest');

const server = request('http://localhost:3001');

describe("GET /bk_completedReports", () => {
    it("Should get Bob Beekeeper's completed reports", async () => {
        const bkInfo = {
            bk_id: 1,
        };
        const response = await server
            .get('/bk_completedReports')
            .send(bkInfo);
        expect(response.status).toBe(200);
    })
});