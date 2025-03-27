import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

export const signup = async (req, res) => {
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
        res.status(500).json({ error: error.message });
    }
};
