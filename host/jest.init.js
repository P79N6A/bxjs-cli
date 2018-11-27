const fs = require('fs')
const path = require('path')
const assert = require('assert')
const glob = require('glob')
const _ = require('lodash')

async function find_files(pattern, options) {
    return new Promise((resolve, reject) => {
        glob(pattern, options, function (err, files) {
            // files is an array of filenames.
            // If the `nonull` option is set, and nothing
            // was found, then files is ["**/*.js"]
            // err is an error object or null.
            if (err) {
                reject(err)
            } else {
                resolve(files)
            }
        })
    })
}

// 清空掉上次执行残留的$.ts文件
async function __reset__() {
    let files = await find_files(path.join(__dirname, './test/**/$.ts'))
    files.map(f => fs.unlinkSync(f))
}

// 生成$.ts文件（在test/非api和test子目录下递归生成$.ts文件作为单元测试的桩文件）
async function __make__() {
    let files = await find_files(path.join(__dirname, './test/**/*.ts'))
    const map = {}
    for (let f of files) {
        const key = f.replace('/' + path.basename(f), '')
        map[key] = ''
    }
    const dirs = Object.keys(map)
    for (let d of dirs) {
        // 忽略test/api和test/test的特殊预留目录前者用于自定义接口文档，后者用于传统jest测试方法开发使用。
        if (d.startsWith(path.join(__dirname, '/test/api')) ||
            d.startsWith(path.join(__dirname, '/test/test'))) {
            continue
        }
        // 忽略掉包含$符号的目录（方便根据测试出来的问题用例逐个调试解决问题屏蔽掉无关用例）
        if (d.includes('$')) {
            continue
        }
        fs.writeFileSync(path.join(d, '$.ts'), '')
    }
}

// TODO 查找所有的$.ts文件存在子目录并且自动初始化测试用例文件
async function __init__() {
    await __reset__()
    await __make__()
    let files = await find_files(path.join(__dirname, './test/**/$.ts'))
    files.map(async f => {
        const dir = f.replace(/\/\$.ts$/, '')
        const unit = dir.replace(path.join(__dirname, 'test') + '/', '')
        const modules = (await find_files('*.ts', {cwd: dir}))
            .filter(f => f != '$.ts')
            .map(f => f.replace(/\.ts$/, ''))
        // console.log(dir, modules)
        let out = '// 此文件会在单元测试执行过程中自动生成并且覆盖（请勿手动编辑）\r\n'
        for (let m of modules) {
            const ref = m.replace(/^[0-9a-zA-Z]+[_-]?/, '').replace('-', '_')
            out += `import ${ref} from './${m}'\r\n`
        }
        out += '\r\n'
        out += `describe('${unit}', () => {\r\n`
        for (let m of modules) {
            const ref = m.replace(/^[0-9a-zA-Z]+[_-]?/, '').replace('-', '_')
            out += `    test('${m}', ${ref})\r\n`
        }
        out += `})\r\n`
        fs.writeFileSync(path.join(dir, '$.ts'), out)
        // console.log(out)
    })
}

__init__()