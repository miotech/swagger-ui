FROM nginx:alpine

RUN mkdir /server
COPY dist /usr/share/nginx/html
