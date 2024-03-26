FROM node:latest
WORKDIR /usr/src/app
COPY krampoline/ ./
CMD ["npm", "start"]
#COPY ./frontend/pack /usr/src/app/pack
#RUN tar -xvf pack && rm -f pack && npm -g install