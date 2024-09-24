const mongoose = require('mongoose');
require('dotenv').config();

const connection = mongoose.createConnection(process.env.MONGODB_URI)
    .on('open', () => {
        console.log("Mongodb is Connected");
    })
    .on('error', (error) => {
        console.error("Error to Connect Mongodb:", error);
    });

module.exports = connection;
