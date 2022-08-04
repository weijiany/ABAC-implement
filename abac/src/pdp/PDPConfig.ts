import {Extractor} from "./extractors";

interface Path {
    path: string;
    resource: string;
    extractors: Extractor[]
}

interface PDPConfig {
    paths: Path[]
}
export {PDPConfig, Path}
