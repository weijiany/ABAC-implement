import request from "supertest";
import app from "../src/app";

describe("test app.ts", () => {
    it("should return 200", async () => {
        const id = "1";
        const res = await request(app).get(`/users?id=${id}`);
        expect(res.body).toEqual({
            id,
            name: "Goudan"
        });
    });
});
