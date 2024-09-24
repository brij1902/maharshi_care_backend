const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const userSchema = new Schema({

    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,

    },
    password: {
        type: String,
        unique: true,
    }
});

const UserModel = db.model('User', userSchema);

module.exports = UserModel;