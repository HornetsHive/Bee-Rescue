const request = require('supertest');
require('dotenv').config();

const server = request('http://localhost:3001');

describe("POST /bk_update", () => {
    it("Should update the first Beekeeper in the Database", async () => {
        const bkUpdate = {
            fname: "Bob",
            lname: "Beekeeper",
            phone_no: "1234567890",
            address: "Test Lane",
            city: "Sacramento",
            zip: "95600",
            bk_id: 1,
            key: process.env.KEY
        };
        const response = await server
            .post('/bk_update')
            .send(bkUpdate);
        expect(response.status).toBe(200);
    })
});