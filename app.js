const express = require('express');
const userRoutes = require('./routes/user_routes');
const MCareRoutes = require('./routes/mcare_user_routes');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/user', userRoutes);

app.use('/api/MCareUser', MCareRoutes);

module.exports = app;
