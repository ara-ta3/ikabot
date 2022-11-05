FROM node:gallium-buster
COPY tsconfig.json /opt/tsconfig.json
COPY yarn.lock /opt/yarn.lock
COPY package.json /opt/package.json
COPY Makefile /opt/Makefile
COPY src /opt/src
WORKDIR /opt
RUN make install
RUN make tsc
CMD node src/Run.js
