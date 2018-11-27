# bxjs-cli-target包发布管理命令
PACKAGE := @bxjs/bxjs-cli-target

login:
	# 登录npmjs账号（https://www.npmjs.com/）
	npm login --registry=https://registry.npmjs.org/ --scope=@bxjs
publish:
	cd ./host
	# 发布$(PACKAGE)管理（发布之前需要先执行make login命令）
	rm -rf out dist && tsc && mkdir -p out && cp -rvf ./package.json ./test ./app ./dist ./out
	npm publish ./out --access=public
	# rm -rf out dist
	@echo "\033[0;32m"
	@echo "Publish $(PACKAGE) Successfully!"
	@echo "\033[0m"
