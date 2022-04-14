const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.checkuser = async (req, res, next) => {

    console.log('Entering inside checkuser method backend...')

    const name = req.body.name;
    const email = req.body.email;
    const phoneno = req.body.phoneno;

    try {

        const isName = await User.findOne({
            where: {
                name: req.body.name,
            }
        })

        if (isName) {
            return res.status(400).send({ measage: "usename already exits" });
        }

        const isEmail = await User.findOne({
            where: {
                email: req.body.email,
            }
        })

        if (isEmail) {
            return res.status(400).send({ measage: "Email already exits" });
        }

        const isPhoneNumber = await User.findOne({
            where: {
                phoneno: req.body.phoneno,
            }
        })

        if (isPhoneNumber) {
            return res.status(400).send({ measage: "Phonenumber already exits" });
        }
    }
    catch (error) {
        res.status(500).send({ message: "oops something went wrong try again!!!" });
    }

    next();

}

exports.signup = async (req, res, next) => {

    console.log('Entering inside signup method backend...')

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        phoneno: req.body.phoneno,
        password: bcrypt.hashSync(req.body.password, 10),
    })
        .then((user) => {
            res.status(200).send({ messsage: "user created successfully..." });
        })
        .catch(err => {
            console.log(err);
        })
}
