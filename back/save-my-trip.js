#!/usr/bin/env node
const bodyParser = require('body-parser');
const Rx = require('rxjs');
const airfranceRouter = require('./route/airfrance-router');
const uberRouter = require('./route/uber-router');
const recastRouter = require('./route/recast-router');
const googleRouter = require('./route/google-router');
const skyScannerRouter = require('./route/skyscanner-router');
const cityMapperRouter = require('./route/citymapper-router');
const walletRouter = require('./route/wallet-router');
const blablacarRouter = require('./route/blablacar-router');

module.exports = app => {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  /* Declares all routers */
  app.use('/api/airfrance/', airfranceRouter);
  app.use('/api/uber/', uberRouter);
  app.use('/api/recast/', recastRouter);
  app.use('/api/google/', googleRouter);
  app.use('/api/skyscanner/', skyScannerRouter);
  app.use('/api/citymapper/', cityMapperRouter);
  app.use('/api/wallet/', walletRouter);
  app.use('/api/blablacar/', blablacarRouter);
  
};



