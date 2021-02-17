'use strict';
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const config = require('./config');
const studentRoutes = require('./routes/user-routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use('/api', studentRoutes.routes);


app.listen(config.port, ()=> console.log('Server is up and running on PORT:' + config.port))