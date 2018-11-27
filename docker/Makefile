BASE_IMAGE := aliyunfc/aliyun-fc:nodejs8
IMAGE      := bxjs/aliyun:exp
NAME       := bxjs-aliyun-exp

# TODO 基于bxjs-cli调整命令行工具链
# /Users/chujinghui/Desktop/bxjs/bxjs-cli/docker

CODE := /Users/chujinghui/Desktop/work/xux-fc-online-projects/toufang-system-web:/code
PORT := 8888:8888

update:
	# 下载基础镜像最新版本到本地以便于基于最新基础镜像正确生成BXJS开发工具链镜像
	docker pull $(BASE_IMAGE)
	@echo "\033[0;32m"
	@echo "Update $(BASE_IMAGE) Successfully!"
	@echo "\033[0m"
build: update
	# 基于Dockerfile本地制作镜像
	docker build --rm --no-cache -t $(IMAGE) .
	@echo "\033[0;32m"
	@echo "Build $(IMAGE) Successfully!"
	@echo "\033[0m"
login:
	# 登录docker hub账号（https://hub.docker.com/）
	docker login # -u laochu
publish:
	# 发布构建好的镜像到docker hub上集中管理（发布之前需要先执行make login命令）
	docker push $(IMAGE)
	docker inspect $(IMAGE)
	@echo "\033[0;32m"
	@echo "Publish $(IMAGE) Successfully!"
	@echo "\033[0m"
remove:
	docker rmi $(IMAGE)
	@echo "\033[0;32m"
	@echo "Delete $(IMAGE) Successfully!"
	@echo "\033[0m"
start:
	# 后台运行DOCKER容器
	docker run -v $(CODE) -p $(PORT) -dit --privileged --name $(NAME) $(IMAGE) /bin/bash
	@echo "\033[0;32m"
	@echo "Start $(IMAGE) Container Successfully!"
	@echo "\033[0m"
stop:
	docker stop $(NAME)
	docker rm $(NAME)
	@echo "\033[0;32m"
	@echo "Stop $(IMAGE) Container Successfully!"
	@echo "\033[0m"
connect:
	# 控制台链接后台运行的DOCKER容器
	docker exec -it $(NAME) /bin/bash
