import {PIPConfig} from "../pdp/pip/PIPConfig";
import {PDPConfig} from "../pdp/PDPConfig";

interface PEPConfig {
    backendAddress: string;
    informationPoints: PIPConfig[];
    endpoints: Record<string, PDPConfig>;
}

export default PEPConfig;
