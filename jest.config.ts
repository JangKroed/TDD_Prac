import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    automock: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts.tsx}'],
    coverageProvider: 'babel',
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    maxConcurrency: 5,
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
};

export default config;
