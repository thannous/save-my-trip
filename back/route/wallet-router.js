#!/usr/bin/env node
const Rx = require('rxjs');
const express = require('express');
const router = express.Router();
const Wallet = require('../wallet-api/wallet-api');

const wallet = new Wallet({
	user: 'Emma ...',
	initial_amount: '350'
});


/* WALLET */
router.route('/mywallet').get((request, response) => {
  console.log('GET', '/api/mywallet');
  response.json(wallet.get());
});

router.route('/mywallet').post((request, response) => {
	  console.log('POST', '/api/mywallet');
	  response.json(wallet.update(request.body.amount,request.body.label));
	});

module.exports = router;
