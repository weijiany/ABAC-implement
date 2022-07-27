/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json"
        }
    },
    moduleFileExtensions: [ "ts", "js" ],
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    testMatch: [ "**/tests/**/*.spec.ts" ]
};
