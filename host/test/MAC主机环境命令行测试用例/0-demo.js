"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spawn = require('cross-spawn');
const child_process = require('child_process');
exports.default = async () => {
    // // Spawn NPM synchronously
    // // const result = spawn.sync('echo', ['./xxx.txt'], {stdio: 'inherit', shell: false});
    //
    // // child_process.execSync('echo asdfasdfasdfasdfasd')
    // child_process.exec('echo "The \\$HOME variable is $HOME"');
    // // console.log(result)
    // console.log('asdfas')
    // expect(null).toBeNull()
    // 测试可以正常显示命令行中的内容（子进程的系统调用方法封装实现）xexecute('',[])
    const spawn = require('cross-spawn');
    spawn.sync('git', ['status'], {
        stdio: 'inherit'
    });
};
//# sourceMappingURL=0-demo.js.map