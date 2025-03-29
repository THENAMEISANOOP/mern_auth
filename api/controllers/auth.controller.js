import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { createError } from '../utils/error.js';

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user with hashed password
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(200).json({ message: "Signup successful!" });
    } catch (error) {
        next(error);
    }
};

// Sign-in function
export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(createError(404, 'User not found'));

        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) return next(createError(401, 'Wrong credentials'));

        // Generate JWT token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Remove password before sending response
        const { password: hashedPassword, ...rest } = validUser._doc;

        // Set cookie with token (expires in 7 days)
        res.cookie('access_token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        });

        // Send response
        res.status(200).json({
            message: "Login successful",
            user: rest
        });

    } catch (error) {
        next(error);
    }
};
