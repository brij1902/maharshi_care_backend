const express = require('express');
const userRoutes = require('./routes/user_routes');
const MCareRoutes = require('./routes/mcare_user_routes');

const app = express();

app.use(express.json());

app.use('/api/user', userRoutes);

 app.use('/api/MCareUser', MCareRoutes);

module.exports = app;
