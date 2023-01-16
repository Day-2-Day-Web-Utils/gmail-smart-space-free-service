FROM node:18.4-buster
ARG version
ENV build_version=$version

EXPOSE 4000
# Install packages from apt
RUN apt update && \
    apt install vim -y

COPY . /backend
WORKDIR /backend
RUN npm install pm2 -g
RUN rm -rf node_modules && \
    npm install

CMD ["pm2-runtime", "ecosystem.config.js"]
