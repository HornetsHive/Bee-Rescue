const request = require('supertest');
require('dotenv').config();

const server = request('http://localhost:3001');

describe("POST /bk_qualif_update", () => {
    it("Should update Bob Beekeeper's qualifications", async () => {
        const qualifUpdate = {
            ground_swarms: 0,
            valve_or_water_main: 0,
            shrubs: 0,
            low_tree: 0,
            mid_tree: 0,
            tall_tree: 0,
            fences: 0,
            low_structure: 0,
            mid_structure: 0,
            chimney: 0,
            interior: 0,
            cut_or_trap_out: 0,
            traffic_accidents: 0,
            bucket_w_pole: 0,
            ladder: 0,
            mechanical_lift: 0,
            bk_id: 1,
            key: process.env.KEY
        };
        const response = await server
            .post('/bk_qualif_update')
            .send(qualifUpdate);
        expect(response.status).toBe(200);
    })
});