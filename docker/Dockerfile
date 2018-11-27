# https://github.com/aliyun/fc-docker
# https://hub.docker.com/r/aliyunfc/aliyun-fc/tags/
FROM aliyunfc/aliyun-fc:nodejs8

# 设置ROOT用户启动脚本(中文UTF8编码配置、...)
COPY /root/.bashrc /root

# 被阉割的常用LINUX命令安装(killall vim ifconfig netstat ...)
RUN apt-get install psmisc
RUN apt-get install vim -y
RUN apt-get install net-tools -y

# TODO npm包淘宝镜像源的相关下载配置（解决发布的时候镜像下载安装问题）
# TODO 每次单元测试启动时候需要在容器中重新打包编译运行环境确保原生依赖问题可以得到彻底的解决避免出错

# TODO 预先内置bxjs-cli-target的全局命令包，以及typescript等全局命令包，确保开发流程可以顺畅执行。

# TODO MYSQL、REDIS基础开发环境的安装（取代线上环境进行本地单元测试使用测试环境重构机制实现）

# 容器启动后的初始执行命令
CMD ["bash"]
