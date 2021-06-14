FROM node:16-alpine

COPY frontend/ frontend/
COPY backend/ app/
COPY data/ data/

RUN cd app && npm install express csv-parse --save

CMD node app/main.js data/DBBetriebsstellenverzeichnis.csv