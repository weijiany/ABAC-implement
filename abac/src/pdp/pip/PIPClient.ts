import axios from "axios";

class PIPClient {

    public get(path: string, param_dict: {[key: string]: any}): Promise<any> {
        const params = Object.keys(param_dict)
            .map((key: string) => (`${key}=${param_dict[key]}`))
            .join("&");
        return axios.get(`http://localhost:3000${path}?${params}`);
    }
}

export default PIPClient;
