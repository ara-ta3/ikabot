FROM node:gallium-buster@sha256:f77a1aef2da8d83e45ec990f45df50f1a286c5fe8bbfb8c6e4246c6389705c0b
COPY tsconfig.json /opt/tsconfig.json
COPY yarn.lock /opt/yarn.lock
COPY package.json /opt/package.json
COPY Makefile /opt/Makefile
COPY src /opt/src
WORKDIR /opt
RUN make install
RUN make tsc
CMD node src/Run.js
