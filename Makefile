YARN=yarn
name=ikabot
adapter=shell

help:
	cat Makefile

install:
	$(YARN) install

start: .env
	set -o allexport && source $< && $(YARN) run start --name $(name) --adapter $(adapter)

start/slack:
	$(MAKE) start adapter=slack

start/discord:
	$(MAKE) start adapter=discord

.env: env.sample
	cp -f $< $@
