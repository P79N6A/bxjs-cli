#!/usr/bin/env bash
# bxjs-cli包发布管理命令（发布之前需要先执行make login命令）

npm version patch
NEW_VERSION=$(npm version | xargs)
rm -rf out && mkdir -p out && tsc && cp -rvf ./*.json ./index.* ./global.d.ts ./app ./out
npm publish ./out --access=public
rm -rf out false
cd ..
git add --all
git commit -m "auto release $NEW_VERSION"
git push
echo -e "\033[32m Publish @bxjs/bxjs-cli Successfully! $NEW_VERSION \033[0m"
