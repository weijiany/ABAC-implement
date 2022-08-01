import axios from "axios";
import {PIPConfig} from "./PIPConfig";
import {Attribute} from "../../types/types";

class PIPClient {
    private informationPoints: PIPConfig[];

    constructor(informationPoints: PIPConfig[]) {
        this.informationPoints = informationPoints;
    }

    public async collectAttributes(attributes: Attribute): Promise<Attribute> {
        let requests = this.informationPoints.map((point: PIPConfig) => {
            let params = Object.assign({}, ...point.options.input.map(keyPair => {
                let res: Record<string, string> = {};
                res[keyPair.key] = attributes[keyPair.value] as string;
                return res;
            }));
            return axios({
                method: "GET",
                url: point.options.endpoint,
                params
            });
        })
        let responses = await Promise.all(requests)

        return {};
    }

    public get(path: string, param_dict: {[key: string]: any}): Promise<any> {
        const params = Object.keys(param_dict)
            .map((key: string) => (`${key}=${param_dict[key]}`))
            .join("&");
        return axios.get(`http://localhost:3000${path}?${params}`);
    }
}

export default PIPClient;
