import {PIPClient} from "./pip"
import {Request} from "express";
import {Path, PDPConfig} from "./PDPConfig";
import {PIPConfig} from "./pip/PIPConfig";
import {Attribute} from "../types/types";
import {Extractor, ExtractorKeyPair} from "./extractors";
import {assign} from "../utils";

class PDP {
    private readonly pipClient: PIPClient;
    private readonly endpoints: Record<string, PDPConfig>;

    constructor(endpoints: Record<string, PDPConfig>, informationPoints: PIPConfig[]) {
        this.pipClient = new PIPClient(informationPoints);
        this.endpoints = endpoints;
    }

    public async checkAccess(req: Request) {
        let paths: Path[] = Object.values(this.endpoints)
            .map(endpoint => endpoint.paths)
            .flat()
            .filter(aPath => aPath.path === req.path);
        if (paths.length === 0)
            return true;

        let specificPath = paths[0];
        let attributes = specificPath.extractors
            .flat()
            .map((extractor: Extractor) => extractor.options)
            .flat()
            .map((keyPair: ExtractorKeyPair) => ({[keyPair.attribute]: req.header(keyPair.key)}))
            .reduce(assign, {"urn:resource-id": specificPath.resource}) as Attribute

        return await this.pipClient.collectAttributes(attributes);
    }
}

export default PDP
