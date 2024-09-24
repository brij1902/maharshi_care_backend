const UserModel = require("../model/user_model");
const bcrypt = require('bcrypt');


exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ "message": "User Already Exists" })
        }

        const hasPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            email,
            password: hasPassword
        });

        await newUser.save();

        return res.status(200).json({ message: 'user register successfully', status: true, user: newUser })
    } catch (error) {
        return res.status(400).json({
            'message': 'Error to Register User',
        })
    }

}