const Razorpay = require('razorpay');
const Order = require('../models/order');

exports.createOrder = (req, res, next) => {

    console.log("inside pruchase order backend >>> ");

    try {

        var instance = new Razorpay({ key_id: process.env.RAZ_KEY_ID, key_secret: process.env.RAZ_SECRET_KEY });

        const amount = 2500 * 100;

        instance.orders.create({ amount, currency: "INR" }, (err, order) => {
            if (err) {
                console.log(err);
            }
            req.user.createOrder({ orderId: order.id, status: "Pending" }).then(() => {
                return res.status(201).json({ order, key_id: instance.key_id });
            })
            // return res.send(order);
        })
    } catch (err) {
        console.log(err);
    }


}

exports.updateTransactioStatus = (req, res, next) => {

    console.log("inside update Transaction function >>> ");

    console.log('req body of updateTranaction >> ' , req.body);


    try {
        const orderId = req.body.orderId;
        const paymentId = req.body.paymentId;

        Order.findOne({ where: { orderId: orderId } }).then(order => {
            order.update({ paymentId: paymentId, status: "successfull" }).then(() => {
                return res.status(202).json({ success: true, message: "Transaction successfull" })
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        })

    }
    catch (err) {
        console.log(err);

    }

}
