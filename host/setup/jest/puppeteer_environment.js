const chalk = require('chalk')
const NodeEnvironment = require('jest-environment-node')
const puppeteer = require('puppeteer')
const fs = require('fs')
const os = require('os')
const path = require('path')
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')
const circular_json = require("circular-json")
const ErrorStackParser = require('error-stack-parser')

class PuppeteerEnvironment extends NodeEnvironment {
    constructor(config) {
        super(config)
    }

    async setup() {
        console.log(chalk.yellow('Setup Test Environment.'))
        await super.setup()
        const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8')
        if (!wsEndpoint) {
            throw new Error('wsEndpoint not found')
        }
        this.global.__BROWSER__ = await puppeteer.connect({
            browserWSEndpoint: wsEndpoint,
        })

        // 单个case文件执行的初始化操作（加载对应的测试页面，其实是可以固定到一个专门页面进行统一调用的更便捷的执行封装）
        // 初始化单元测试页面
        this.global['__BXJS_TEST_WEB_PAGE__'] = await this.global['__BROWSER__'].newPage()
        // 通过调用特殊页面封装的xpost方法在浏览器上模拟前端行为进行单页应用上的ajax操作
        await this.global['__BXJS_TEST_WEB_PAGE__'].goto('http://127.0.0.1:8888/web/test')

        // 注册单元测试中的全局方法定义
        const _this = this
        // 在单元测试场景下的日志打印接口封装。（打印到单独的日志文件中与bxjs日志合并到一起方便联调定位问题）
        this.global['zlog'] = (...args) => {
            let source = ''
            try {
                throw new Error()
            } catch (err) {
                let out = ErrorStackParser.parse(err)
                let idx = 0
                // 找到第一个TS文件的执行位置
                let find_ts_sufix_file_count = 0
                for (; idx < out.length; idx++) {
                    if (/\.ts$/.test(out[idx].fileName)) {
                        find_ts_sufix_file_count += 1
                    }
                    if (find_ts_sufix_file_count == 1) {
                        break
                    }
                }
                if (find_ts_sufix_file_count == 1) {
                    source = '[' + out[idx]['fileName'] + ':' + out[idx]['lineNumber'] + ']'
                } else {
                    source = '#'
                }
            }
            let output = circular_json.stringify([...args], null, 4)
            // 将单元测试日志与后端执行日志合并到同一个文件上方便调试日志统一定位问题保持日志的连续性（tail -f /tmp/bxjs.log）
            fs.appendFileSync('/tmp/bxjs.log', source + output + "\r\n")
        }

        // 单元测试场景下调用entries接口类似于postman的方法执行接口请求。
        const __zpost__ = this.global['zpost'] = async function (path, param = {}) {
            // 通过浏览器单页上封装的ajax接口的单元测试方法集成环境调试
            const out = await _this.global['__BXJS_TEST_WEB_PAGE__'].evaluateHandle((param) => {
                return new Promise((resolve, reject) => {
                    window['xpost'](param.path, param.param).then((out) => {
                        resolve(out)
                    }).catch((err) => {
                        reject(err)
                    })
                })
            }, {path, param})
            return await out.jsonValue()
        }
        // 远程静态类方法调用方法 path格式为：模块绝对路径/静态类/静态方法。
        // 被调用的静态类格式必须要为：async方法定义、输入参数为PlainObject普通对象。
        this.global['zcall'] = async function (path, param = {}) {
            param = Object.assign({}, param, {__call__: path})
            return await __zpost__('/web/test-call', param)
        }
    }

    async teardown() {
        console.log(chalk.yellow('Teardown Test Environment.'))
        await super.teardown()
    }

    runScript(script) {
        return super.runScript(script)
    }
}

module.exports = PuppeteerEnvironment