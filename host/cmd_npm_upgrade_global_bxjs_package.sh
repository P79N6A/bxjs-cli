#!/usr/bin/env bash

# npm包发布之后会存在大约1分钟左右时间的镜像服务器同步更新时间需要等待一会才能正常拉取成功，需要手动同步触发更新操作。

npm update -g @bxjs/bxjs-cli --registry=https://registry.npmjs.org/ --no-cache
npm update --save @bxjs/base --registry=https://registry.npmjs.org/ --no-cache

# 手动触发相关的包正确淘宝镜像缓存正确（当发布到npmjs新包的时候）
# npm install -g tnpm --registry=http://registry.npm.alibaba-inc.com
# tnpm sync @bxjs/bxjs-cli
# tnpm sync @bxjs/base

npm update -g @bxjs/bxjs-cli --registry=http://registry.npm.alibaba-inc.com --no-cache
npm update --save @bxjs/base --registry=http://registry.npm.alibaba-inc.com --no-cache
