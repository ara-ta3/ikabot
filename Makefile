YARN=yarn
ENV=.env
HEROKU=heroku
NODE=node
heroku_app_name=splatoon-ika-bot

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
	$(YARN) run compile

clean:
	rm -f src/**/*.js

prettier:
	$(YARN) run prettier

start: $(ENV) tsc
	set -o allexport && . ./$< && $(NODE) src/Run.js

.env: env.sample
	cp -f $< $@

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
