import {Request} from "express";
import PDP from "../pdp";

class PEP {

    private readonly pdp: PDP

    constructor() {
        this.pdp = new PDP();
    }

    public async checkAccess(req: Request) {
        return await this.pdp.checkAccess(req);
    }
}

export default PEP;
