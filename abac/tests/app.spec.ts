import request from "supertest";
import app from "../src/app";

describe("test app.ts", () => {
    it.each(["/", "/a", "/a/b"])("should return 200 for any path %p", async (path: string) => {
        const resp = await request(app).get(path);
        expect(resp.status).toBe(200);
    })
});
