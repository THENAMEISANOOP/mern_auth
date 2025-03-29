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

// Google Login
export const google = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = user._doc;
            const expiresIn = new Date(Date.now() + 3600000);

            res.cookie('accesstoken', token, { httpOnly: true, expires: expiresIn });
            return res.json(rest); // ✅ Send response back
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);

            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo
            });

            await newUser.save();
            const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
            const { password: hashedPassword2, ...rest } = newUser._doc;
            const expiresIn = new Date(Date.now() + 3600000);

            res.cookie('accesstoken', token, { httpOnly: true, expires: expiresIn });
            return res.json(rest); // ✅ Send response back
        }
    } catch (error) {
        next(error);
    }
};