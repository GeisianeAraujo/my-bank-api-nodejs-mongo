'use strict'

const accountController = require('../controllers/account-controller');
const express = require('express');
const router = express.Router();

router.post('/api/account/create', accountController.createAccount);
router.put('/api/account/deposit/:id', accountController.registerDeposit);
router.put('/api/account/withdraw/:id', accountController.registerWithdraw);
router.get('/api/account/check/:id', accountController.checkBalance);
router.delete('/api/account/delete/:id', accountController.deleteAccount);

module.exports = router;