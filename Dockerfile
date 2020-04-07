FROM node as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build
RUN ls -al

FROM nginx:alpine
COPY --from=react-build /app/build /usr/share/nginx/html/
EXPOSE 80
CMD nginx -g 'daemon off;'