const userController = require("../controllers/auth");
const expenseController = require("../controllers/expense");
const purchaseController = require("../controllers/purchase");


const express = require('express');
const routes = express.Router();

routes.post('/signup', userController.checkuser, userController.signup);
routes.post('/login', userController.login);
routes.post('/addExpense', expenseController.verifyAuth, expenseController.addExpense);
routes.get('/purchase/premiummembership', expenseController.verifyAuth, purchaseController.createOrder);
routes.post('/purchase/updatetransactionstatus', expenseController.verifyAuth, purchaseController.updateTransactioStatus)

module.exports = routes;