const request = require('supertest');

const server = request('http://localhost:3001');

describe("POST /bk_qualif_update", () => {
    it("Should update Bob Beekeeper's qualifications", async () => {
        const qualifUpdate = {
            ground_swarms: "",
            valve_or_water_main: "",
            shrubs: "",
            low_tree: "",
            mid_tree: "",
            tall_tree: "",
            fences: "",
            low_structure: "",
            mid_structure: "",
            chimney: "",
            interior: "",
            cut_or_trap_out: "",
            traffic_accidents: "",
            bucket_w_pole: "",
            ladder: "",
            mechanical_lift: "",
            bk_id: 1,
        };
        const response = await server
            .post('/bk_qualif_update')
            .send(qualifUpdate);
        expect(response.status).toBe(200);
    })
});