FROM node:alpine

WORKDIR /usr/src/one-month-bot

RUN apk add --no-cache --virtual .gyp python make g++ \
    && apk --no-cache add avahi-dev \
    && apk del .gyp

RUN apk add --no-cache yarn

WORKDIR /one-month-bot
