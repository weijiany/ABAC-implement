interface PIPKeyPair {
    key: string;
    value: string;
}

interface PIPOptions {
    endpoint: string;
    input: PIPKeyPair[];
    output: PIPKeyPair[];
}

interface PIPConfig {
    options: PIPOptions;
}

export {PIPConfig, PIPKeyPair, PIPOptions};
