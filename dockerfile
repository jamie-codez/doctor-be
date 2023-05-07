FROM node:latest
# RUN npm install -g sails@0.12.13
ENV HOME /usr/src/app
WORKDIR ${HOME}
RUN npm install -g npm@latest && rm -rf node_modules && npm cache clean --force && rm -f package*.json
ADD package*.json ${HOME}
RUN npm install
COPY . ${HOME}
EXPOSE 6000
CMD ["npm","run","dev"]
# CMD sails lift