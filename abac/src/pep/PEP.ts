import PDP from "../pdp";
import {Request} from "express";
import {sync} from "read-yaml-file"
import PEPConfig from "./PEPConfig";


class PEP {

    private readonly pdp: PDP
    private readonly config: PEPConfig;

    constructor(path: string) {
        this.config = sync<PEPConfig>(path);
        this.pdp = new PDP(this.config.endpoints, this.config.informationPoints);
    }

    public async checkAccess(req: Request) {
        return await this.pdp.checkAccess(req);
    }
}

export default PEP;
