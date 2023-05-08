const request = require('supertest');
require('dotenv').config();

const server = request('http://localhost:3001');

describe('POST /insert', () => {
    it('should create new report', async () => {
        const newReport = {
            address: "Test Street",
            email: "Testmail@mail.com",
            duration: "10",
            location: "ext_wall",
            height: "low",
            size: "med",
            category: 'normal',
            fname: "Test",
            lname: "Name",
            city: "Test City",
            zip: "00000",
            p_type: "res_detached",
            phone_no: "0000000000",
            weight: null,
            key: process.env.KEY
        };
        const response = await server
            .post('/insert')
            .send(newReport);
        expect(response.status).toBe(200);
    })
});