FROM node:latest AS build
RUN node -v

WORKDIR /source

COPY au-client/ ./au-client/
COPY chucknorris/ ./chucknorris/
COPY flappy-bird-js/ ./flappy-bird-js/
COPY flappy-bird-ts/ ./flappy-bird-ts/
COPY react-client/ ./react-client/
COPY vue-client/ ./vue-client/

WORKDIR /source/au-client
RUN npm ci
RUN npm run build

WORKDIR /source/chucknorris
RUN npm ci
RUN npm run build

WORKDIR /source/flappy-bird-js
RUN npm ci
RUN npx webpack ./src/index.js
RUN cp -r ./css ./dist/
RUN cp -r ./assets ./dist/

WORKDIR /source/flappy-bird-ts
RUN npm ci
RUN npx webpack ./src/index.ts
RUN cp -r ./css ./dist/
RUN cp -r ./assets ./dist/

WORKDIR /source/react-client
RUN npm ci
RUN npm run build

WORKDIR /source/vue-client
RUN npm ci
RUN npm run build

FROM nginx:latest AS deploy

COPY --from=build /source/au-client/dist/ /usr/share/nginx/html/au/
COPY --from=build /source/chucknorris/dist/ /usr/share/nginx/html/chucknorris/
COPY --from=build /source/flappy-bird-js/dist/ /usr/share/nginx/html/flappy-bird-js/
COPY --from=build /source/flappy-bird-ts/dist/ /usr/share/nginx/html/flappy-bird-ts/
COPY --from=build /source/react-client/build/ /usr/share/nginx/html/react/
COPY --from=build /source/vue-client/dist/ /usr/share/nginx/html/vue/
COPY nginx.conf /etc/nginx/nginx.conf
