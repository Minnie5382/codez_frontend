FROM node:latest
WORKDIR /usr/src/app
COPY fe/ ./
RUN npm i
CMD ["npm", "start"]
#COPY ./frontend/pack /usr/src/app/pack
#RUN tar -xvf pack && rm -f pack && npm -g install