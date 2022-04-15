
const express = require('express');
const app = express();
var cors = require('cors')
const routes = require("./routes/routes");
const sequelize = require('./util/database');
const User = require('./models/user');
const Expense = require('./models/expense');

const dotenv = require('dotenv');
dotenv.config();


app.use(express.json());
app.use(cors());
app.use(routes);


User.hasMany(Expense);
Expense.belongsTo(User);


sequelize.sync(
    // { force: true }
).then(() => {
    app.listen(3000, () => {
        console.log("Restarting the sever...");
    });
}).catch(err => {
    console.log('err >>> ', err);
})


