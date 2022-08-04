import axios from "axios";
import {PIPConfig} from "./PIPConfig";
import {Attribute} from "../../types/types";

class PIPClient {
    private informationPoints: PIPConfig[];

    constructor(informationPoints: PIPConfig[]) {
        this.informationPoints = informationPoints;
    }

    public collectAttributes(attributes: Attribute): Promise<Attribute> {
        let pipReq = this.informationPoints.map(async (point: PIPConfig) => {
            let params = Object.assign({}, ...point.options.input.map(keyPair => {
                let res: Record<string, string> = {};
                res[keyPair.key] = attributes[keyPair.value] as string;
                return res;
            }));
            let respData = (await axios.get<{key: string, value: string}[]>(
                point.options.endpoint, {params})).data;

            return point.options.output.map(keyPair => {
                let res: Record<string, string> = {};
                res[keyPair.value] = respData.filter(item => item.key === keyPair.key)[0].value;
                return res;
            }).reduce((pre, cur) => Object.assign(cur, pre), {});
        });

        return Promise.all(pipReq)
            .then(pipRes => pipRes
                .reduce((pre, cur) => Object.assign(cur, pre), attributes));
    }

    public get(path: string, param_dict: {[key: string]: any}): Promise<any> {
        const params = Object.keys(param_dict)
            .map((key: string) => (`${key}=${param_dict[key]}`))
            .join("&");
        return axios.get(`http://localhost:3000${path}?${params}`);
    }
}

export default PIPClient;
