const bcrypt = require('bcrypt');
const session = require('express-session');
const User = require('../models/User.js')

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.redirect('/auth/login');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            req.session.userId = user._id; // Lưu ID người dùng vào session
            return res.redirect('/');
        } else {
            return res.redirect('/auth/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.redirect('/auth/login');
    }
};
