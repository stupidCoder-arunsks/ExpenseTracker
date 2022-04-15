const userController = require("../controllers/auth");
const expenseController = require("../controllers/expense");


const express = require('express');
const routes = express.Router();

routes.post('/signup', userController.checkuser, userController.signup);
routes.post('/login', userController.login);
routes.post('/addExpense', expenseController.verifyAuth, expenseController.addExpense);


module.exports = routes;