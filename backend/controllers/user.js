const User = require('../models/user');
const { Op } = require("sequelize");

exports.getUserExpenses = async (req, res, next) => {
    console.log("inside get user expenses...")

    try {

        console.log("inside 1st try block...");
        const users = await User.findAll();

        var data = {};

        await Promise.all(

            users.map(async (user) => {
                let totalAmount = 0;

                try {
                    console.log("inside 2nd try block...")

                    const expenses = await user.getExpenses();
                    expenses.forEach((expense) => {
                        totalAmount += expense.amount;
                    });
                } catch (err) {
                    console.log(err);
                }

                data[user.name] = totalAmount;
                console.log('data >> ', data);
            }));

        // console.log('data outside >> ', data);
        res.status(200).json({ "exp": data });


    }
    catch (err) {
        console.log('err >> ', err);
    }

}

exports.getParticularUserExpenses = async (req, res, next) => {
    console.log("Getting inside partiular user expenses...")

    let page = !req.query.page ? 1 : parseInt(req.query.page);
    let totalItems;

    const expense = await req.user.getExpenses().then((expenses) => {
        totalItems = expenses.length;
        const start = page === 1 ? 0 : page - 1 + 10;
        const end = page * 10;
        const data = expenses.slice(start, end);
        res.json({
            "expenses": data, "pagination": {
                currentPage: page,
                nextPage: page + 1,
                previousPage: page - 1,
                hasPreviousPage: page > 1,
                hasNextPage: end < totalItems,
            }
        });

    }).catch(err => {
        console.log(err);
    });

    // console.log('expense count >>> ', expense.length);

    // res.json({ "expenses": expense });
}