import {Extractor} from "./extractors";

interface Path {
    path: string;
    resource: string;
    extractors: Extractor[]
}

interface PDPConfig {
    paths: Path[]
}

const needProcess = (aPath: string, config: PDPConfig): boolean => config.paths.map(path => path.path).includes(aPath);

export {PDPConfig, Path, needProcess}
