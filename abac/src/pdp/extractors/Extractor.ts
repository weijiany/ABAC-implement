interface ExtractorKeyPair {
    key: string;
    attribute: string;
}

interface Extractor {
    type: string;
    options: ExtractorKeyPair[];
}

export {Extractor, ExtractorKeyPair}
