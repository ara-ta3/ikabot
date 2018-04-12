YARN=yarn
name=ikabot
adapter=shell
ENV=.env

help:
	cat Makefile

install:
	$(YARN) install

start: $(ENV)
	set -o allexport && source $< && $(YARN) run start --name $(name) --adapter $(adapter)

start/slack:
	$(MAKE) start adapter=slack

start/discord:
	$(MAKE) start adapter=discord

.env: env.sample
	cp -f $< $@
