FROM node:8.11.1
COPY . /opt/ikabot
WORKDIR /opt/ikabot
CMD bash -c 'make install && make start/discord'
