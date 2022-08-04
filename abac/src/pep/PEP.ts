import PDP from "../pdp";
import {Request} from "express";
import {sync} from "read-yaml-file"
import PEPConfig from "./PEPConfig";
import path from "path";

class PEP {

    private readonly pdp: PDP
    private readonly config: PEPConfig;

    constructor(basePath: string) {
        this.config = sync<PEPConfig>(path.join(basePath, ".config", "root-config.yaml"));
        this.pdp = new PDP(this.config.endpoints, this.config.informationPoints);
    }

    public async checkAccess(req: Request) {
        return await this.pdp.checkAccess(req);
    }
}

export default PEP;
