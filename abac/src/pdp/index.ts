import {PIPClient} from "./pip"
import {Request} from "express";

class PDP {
    private readonly pipClient: PIPClient;

    constructor() {
        this.pipClient = new PIPClient();
    }

    public async checkAccess(req: Request) {
        const resp = await this.pipClient.get("/users", req.query);
        return resp.data
    }
}

export default PDP
