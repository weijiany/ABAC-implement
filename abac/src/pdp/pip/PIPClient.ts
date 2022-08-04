import axios from "axios";
import {PIPConfig} from "./PIPConfig";
import {Attribute} from "../../types/types";
import {assign} from "../../utils";

class PIPClient {
    private informationPoints: PIPConfig[];

    constructor(informationPoints: PIPConfig[]) {
        this.informationPoints = informationPoints;
    }

    public collectAttributes(attributes: Attribute): Promise<Attribute> {
        let pipReq = this.informationPoints.map(async (point: PIPConfig) => {
            let params = point.options.input
                .map(keyPair => ({[keyPair.key]: attributes[keyPair.value]}))
                .reduce(assign, {});

            let resp = await axios.get<{key: string, value: string}[]>(point.options.endpoint, {params});

            return point.options.output.map(keyPair => ({
                [keyPair.value]: resp.data.filter(item => item.key === keyPair.key)[0].value
            })).reduce(assign, {}) as Attribute;
        });

        return Promise.all(pipReq)
            .then(pipRes => pipRes.reduce(assign, attributes));
    }

    public get(path: string, param_dict: {[key: string]: any}): Promise<any> {
        const params = Object.keys(param_dict)
            .map((key: string) => (`${key}=${param_dict[key]}`))
            .join("&");
        return axios.get(`http://localhost:3000${path}?${params}`);
    }
}

export default PIPClient;
