const express = require('express');
const bodyParser = require('body-parser');
const { connect } = require('mongoose');
const app = express();
const dotenv = require('dotenv').config();
const authRouter = require('./routes/authRoutes')
const mediasRouter = require('./routes/mediasRoutes')
const PORT = process.env.PORT || 3000;
const dbConnection = require('./config/dbconn');

dbConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", authRouter);
app.use("/api/medias", mediasRouter);


app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});
