#!/usr/bin/env node
const Rx = require('rxjs');
const express = require('express');
const router = express.Router();
const Recast = require('../recast-api/recast-api');

const recast = new Recast({
  token: '4ac2299f684147685cf9d17d77acae4e',
  language: 'fr'
});

/* RECAST */
router.route('/textConverse').post((request, response) => {
  let getPromise = new Rx.Subject();
  getPromise.subscribe(function (data) {
    response.json(data);
  }, function (err) {
    response.send('Error: ' + err);
  }, function () {
    console.log("COMPLETED");
  });
  recast.textConverse(request.body.text, getPromise);

});

module.exports = router;



