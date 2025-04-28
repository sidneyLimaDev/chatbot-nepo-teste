export default {
    testEnvironment: 'node',
    transform: {
        "^.+\\.js$": ["babel-jest", {
            rootMode: "upward",
            presets: [
                ['@babel/preset-env', { targets: { node: 'current' } }]
            ],
            plugins: [
                '@babel/plugin-syntax-import-meta'
            ]
        }]
    },
    transformIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
};