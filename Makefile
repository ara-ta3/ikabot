YARN=yarn
name=ikabot
adapter=shell
ENV=.env
ECS=ecs-cli
DOCKER_COMPOSE=docker-compose
HEROKU=heroku
heroku_app_name=splatoon-ika-bot
NODE=node

.PHONY: test

help:
	cat Makefile

test:
	$(YARN) run test

install:
	$(YARN) install

outdated:
	$(YARN) outdated

tsc:
	$(YARN) run tsc

clean:
	rm -f src/**/*.js

prettier:
	$(YARN) run prettier

start: $(ENV) tsc
	set -o allexport && . ./$< && $(YARN) run start --name $(name) --adapter $(adapter)

start/slack: tsc
	$(MAKE) start adapter=slack

start/discord: tsc
	$(MAKE) start adapter=discord

start/discord2: $(ENV) tsc
	set -o allexport && . ./$< && $(NODE) src/Run.js

.env: env.sample
	cp -f $< $@

docker/build:
	docker build -t ikabot .

deploy/heroku:
	git push heroku master

deploy/heroku/env: $(HEROKU)
	$(HEROKU) config:push --app $(heroku_app_name) --file $(ENV)

deploy/heroku/setup: $(HEROKU)
	$(HEROKU) git:remote --app $(heroku_app_name)
	$(HEROKU) plugins:install heroku-config
	$(HEROKU) addons:create scheduler:standard --app $(heroku_app_name)
	$(HEROKU) addons:open scheduler --app $(heroku_app_name)

$(HEROKU):
	which $@ || echo 'please install heroku cli https://devcenter.heroku.com/articles/heroku-cli'
