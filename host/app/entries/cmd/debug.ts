export default async (port, options) => {
    if (!port) {
        port = 8888
    } else {
        try {
            port = parseInt(port)
            if (port <= 0) {
                port = undefined
            }
        } catch (e) {
            port = undefined
        }
    }

    if (port) {
        // 启动本地调试进程
        await xcmd('./node_modules/@bxjs/base/cmd_debug_app.sh', `${port}`)
    } else {
        // 终止正在运行中的所有子进程（精确杀进程仅仅是bxjs启动的调试进程才杀掉避免误杀前端进程）
        await xcmd('./node_modules/@bxjs/base/cmd_debug_app.sh', 'x')
    }
}
