FROM node:16-alpine

# copy all application data to container
COPY frontend/ frontend/
COPY backend/ app/
COPY resources/ resources/

# install required npm packages
RUN cd app && npm install express csv-parse --save

CMD node app/main.js resources/DBBetriebsstellenverzeichnis.csv