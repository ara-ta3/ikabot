FROM node:iron-buster@sha256:479103df06b40b90f189461b6f824a62906683e26a32c77d7c3e2d855a0e3e9f
COPY tsconfig.json /opt/tsconfig.json
COPY yarn.lock /opt/yarn.lock
COPY package.json /opt/package.json
COPY Makefile /opt/Makefile
COPY src /opt/src
WORKDIR /opt
RUN make install
RUN make tsc
CMD node src/Run.js
