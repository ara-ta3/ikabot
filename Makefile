YARN=yarn
name=ikabot
adapter=shell
ENV=.env
ECS=ecs-cli
DOCKER_COMPOSE=docker-compose

.PHONY: test

help:
	cat Makefile

test:
	$(YARN) run test

install:
	$(YARN) install

start: $(ENV)
	set -o allexport && . ./$< && $(YARN) run start --name $(name) --adapter $(adapter)

start/slack:
	$(MAKE) start adapter=slack

start/discord:
	$(MAKE) start adapter=discord

.env: env.sample
	cp -f $< $@

profile=
ecs/configure:
	$(ECS) configure --cluster ikabot --region ap-northeast-1

keypair=
ecs/up:
	$(ECS) up --capability-iam --keypair $(keypair)

ecs/service/up:
	$(ECS) compose --project-name ikabot service up

aws/iam:
	aws iam create-role --role-name ecsExecutionRole --assume-role-policy-document file://execution-assume-role.json
	aws iam attach-role-policy --role-name ecsExecutionRole --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

aws/logs:
	aws logs create-log-group --log-group-name ikabot

ecr/login:
	aws ecr get-login --region ap-northeast-1 --no-include-email

docker/build:
	docker build -t ikabot .
