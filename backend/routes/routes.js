const controller = require("../controllers/controller");

const express = require('express');
const routes = express.Router();

routes.post('/signup', controller.checkuser,controller.signup);
routes.post('/login', controller.login);


module.exports = routes;