const mongoose = require('mongoose');
const db = require('../config/db')

const { Schema } = mongoose;

const MCareUserSchema = new Schema({

    fullName: {
        type: String,
        required: true,
    },

    dob: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,

    },
    gender: {
        type: String,

    },
    bloodGroup: {
        type: String,
        required: true
    },
    password: {
        type: String
    }
});

const MCareUserModel = db.model('MCareUser', MCareUserSchema);

module.exports = MCareUserModel;