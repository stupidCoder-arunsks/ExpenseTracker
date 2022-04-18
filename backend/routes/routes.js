const authController = require("../controllers/auth");
const expenseController = require("../controllers/expense");
const purchaseController = require("../controllers/purchase");
const userController = require("../controllers/user");


const express = require('express');
const routes = express.Router();

routes.post('/signup', authController.checkuser, authController.signup);
routes.post('/login', authController.login);
routes.post('/addExpense', expenseController.verifyAuth, expenseController.addExpense);
routes.get('/purchase/premiummembership', expenseController.verifyAuth, purchaseController.createOrder);
routes.post('/purchase/updatetransactionstatus', expenseController.verifyAuth, purchaseController.updateTransactioStatus)
routes.get('/getUserExpenses', userController.getUserExpenses);

module.exports = routes;