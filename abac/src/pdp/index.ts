import {PIPClient} from "./pip"
import {Request} from "express";
import {needProcess, PDPConfig} from "./PDPConfig";
import {PIPConfig} from "./pip/PIPConfig";
import {Attribute} from "../types/types";
import {Extractor, ExtractorKeyPair} from "./extractors";

class PDP {
    private readonly pipClient: PIPClient;
    private readonly endpoints: Record<string, PDPConfig>;

    constructor(endpoints: Record<string, PDPConfig>, informationPoints: PIPConfig[]) {
        this.pipClient = new PIPClient(informationPoints);
        this.endpoints = endpoints;
    }

    public async checkAccess(req: Request) {
        let specificConfigs: PDPConfig[] = Object.values(this.endpoints)
            .filter(config => needProcess(req.path, config));
        if (specificConfigs.length === 0)
            return true;

        let attributes = Object.assign({}, ...specificConfigs[0].paths.map(path => path.extractors)
            .flat()
            .map((extractor: Extractor) => extractor.options)
            .flat()
            .map((keyPair: ExtractorKeyPair) => {
                let res: Record<string, string> = {};
                res[keyPair.attribute] = req.header(keyPair.key) as string;
                return res;
            })) as Attribute;
        await this.pipClient.collectAttributes(attributes);

        const resp = await this.pipClient.get("/attributes", req.query);
        return resp.data
    }
}

export default PDP
