#!/bin/bash

# 自动生成单元测试桩文件$.ts
node ./jest.init.js

# WEB接口测试做覆盖率分析没有任何意义需要屏蔽掉
#./node_modules/.bin/jest --coverage .
./node_modules/.bin/jest .

# 删除临时生成的单元测试桩文件$.ts
rm -rf ./test/**/$.ts
rm -rf ./app/test
rm -rf ./app/app