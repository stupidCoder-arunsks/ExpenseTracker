
const express = require('express');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const app = express();
var cors = require('cors')

const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('./util/database');
const routes = require("./routes/routes");
const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');
const ExpenseFile = require('./models/expensefile');
const morgan = require('morgan');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'),
    { flags: 'a' })

app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(cors());
app.use(routes);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ExpenseFile);
ExpenseFile.belongsTo(User);

sequelize.sync(
    // { force: true }
).then(() => {
    app.listen(3000, () => {
        console.log("Restarting the sever...");
    });
}).catch(err => {
    console.log('err >>> ', err);
})


