const MCareUserModel = require('../model/mcareuser_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.registerUser = async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        // Check if the email or phone number already exists in a single query
        const existingUser = await MCareUserModel.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingUser) {
            if (existingUser.email == email) {
                return res.status(409).json({ message: "Email already exists", errorType: "email", });
            }
            if (existingUser.phone == phone) {
                return res.status(409).json({ message: "Phone number already exists", errorType: "phone", });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new MCareUserModel({
            ...req.body,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully', status: true, user: newUser, errorType: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error registering user', error });
    }
}


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const findUser = await MCareUserModel.findOne({ email });
        if (!findUser) {
            return res.status(409).json({ message: "Email Not Found!!", errorType: "emailNotFound" });
        }

        const comparePassword = await bcrypt.compare(password, findUser.password);
        if (!comparePassword) {
            return res.status(404).json({ message: "Incorrect Password", errorType: "incorrectPassword" });
        }

        // Use the secret key from the .env file
        const token = jwt.sign(
            { id: findUser._id, email: findUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(201).json({
            message: "Login Successfully",
            token: token,
            errorType: "Success",
            user: { id: findUser._id, email: findUser.email },
            status: true,
        });
    } catch (error) {
        return res.status(500).json({ message: `Error.........${error}` });
    }
};