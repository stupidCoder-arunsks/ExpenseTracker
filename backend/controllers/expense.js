const User = require('../models/user');
const Expense = require('../models/expense');
const jwt = require('jsonwebtoken');


exports.addExpense = async (req, res, next) => {

    console.log("Getting inside addExpense Function...");
    console.log('addExpense req body value >> ', `${req.body.body.description}`, req.body.body.amount, `${req.body.body.category}`);


    try {

        const expense = await req.user.createExpense({ "description": req.body.body.description, "amount": req.body.body.amount, "category": req.body.body.category })
        res.status(200).json({ message: "Expense added successfully" });


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error adding expense" });
    }

}