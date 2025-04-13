import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '48h',
    });
};

// Sign up
export const registerUser = async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email }); // add username
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            _id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            userName: user.userName,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { identifier, password } = req.body; //identifier = email or username


    // Find user by email or username
    try {
        const user = await User.findOne({
            $or: [{ email: identifier }, { userName: identifier }]
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Generate JWT
        res.status(200).json({
            _id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            userName: user.userName,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
};
