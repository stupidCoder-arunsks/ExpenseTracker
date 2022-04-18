const User = require('../models/user');

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





    // res.status(200).json({ "users": users });
    // console.log('all users >> ', users);
}