const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();
const Routes = require('./server/routes');

const app = express();
app.use(cors())


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

Routes(app);
port = process.env.PORT || 9000;

app.options('*', cors()) 

app.get("*", (req, res) => {
    res.status(201).send({
        message: "My todo Api"
    })
})

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
});

module.exports = app;