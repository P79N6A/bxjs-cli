module.exports = {
    verbose: true,
    globalSetup: './setup/jest/setup.js',
    globalTeardown: './setup/jest/teardown.js',
    testEnvironment: './setup/jest/puppeteer_environment.js',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            "tsConfigFile": "tsconfig.json",
        }
    },
    testMatch: [
        // 构建在JEST之上的BXJS测试规范自动映射目录配置（忽略test/api和test/test两个子目录自动扫描）
        '**/test/**/\$.ts',
        // 其他JEST标准用例可以根据需要手动配置（根据约定只能写到test/test子目录下）
        // '**/app/test/test/**/*.+(ts|tsx)',
        // '**/app/test/test/puppeteer.ts',
        // '**/app/test/test/puppeteer2.ts',
    ],
    // TS的模块映射语法不支持，需要按照JEST的方法重新定义映射关系。
    // 参考资料：https://github.com/kulshekhar/ts-jest/issues/82
    moduleNameMapper: {
        "@test/(.*)": "<rootDir>/test/$1"
    }
}
