FROM node:latest
ENV HOME /usr/src/app
WORKDIR ${HOME}
RUN npm install -g npm@latest && rm -rf node_modules && npm cache clean --force && rm -f package*.json
ADD package*.json ${HOME}
RUN npm install
COPY . ${HOME}
EXPOSE 3000
CMD ["npm","run","dev"]