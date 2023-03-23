export default {
    moduleFileExtensions: ['js', 'ts'],
    testEnvironment: 'node',
    transform: {
        '\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['./node_modules/'],
    modulePathIgnorePatterns: ['./dist/'],
};
