#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@bxjs/base"); // FIXME 问题很多最佳方案？？太繁琐了不如shell命令来的处理直接！！！包同步镜像太繁琐了。
// 基于tj写的命令行解析框架实现命令路由参数解析
// 参考文档：https://github.com/tj/commander.js/
const cmd = require('commander');
// 提供shell脚本即可自动完成对应的功能实现完全没有必要！！！！
// // TODO
// cmd.command('config')
//     .description('本地开发环境初始化相关自动关联配置（npm代理、docker代理、等等）')
//     .action(require('./app/entries/cmd/config').default)
// 直接模板GIT仓库地址下载即可无需命令繁琐的创建过程完完全全没有必要性。
// // TODO
// cmd.command('new')
//     .description('创建新应用')
//     .action(require('./app/entries/cmd/new').default)
// 放到工程中去执行最方便实现了，避免全局包的安装同步太繁琐了。
// cmd.command('debug')
//     .arguments('[port]')
//     .description('本地调试当前应用或者停掉当前调试后台进程，port缺省值为8888，port为0表示表示停掉当前调试后台进程')
//     .action(require('./app/entries/cmd/debug').default)
// // TODO 优先实现不影响正常开发
// cmd.command('upgrade')
//     .description('当前工程BXJS框架升级（只自动升级patch版本，主次版本升级需要手动配置正确版本号）')
//     .action(require('./app/entries/cmd/upgrade').default)
// // TODO 优先实现不影响正常开发（重点工作集成fun工具进行发布）
// cmd.command('publish')
//     .description('发布应用到各种预定义的环境上(线上、灰度、预发、日常)')
//     .action(require('./app/entries/cmd/publish').default)
// // TODO
// cmd.command('start')
//     .description('启动docker容器后台运行')
//     .action(require('./app/entries/cmd/start').default)
//
// // TODO
// cmd.command('connect')
//     .description('链接登录后台运行的docker容器')
//     .action(require('./app/entries/cmd/connect').default)
//
// // TODO
// cmd.command('stop')
//     .description('停止docker容器后台执行')
//     .action(require('./app/entries/cmd/stop').default)
//开始解析用户输入的命令
cmd.parse(process.argv);
//# sourceMappingURL=index.js.map