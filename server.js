const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

port = process.env.PORT || 9000;

app.get("*", (req, res) => {
    res.status(201).send({
        message: "My todo Api"
    })
})

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
});

module.exports = app;
