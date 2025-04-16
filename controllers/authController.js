import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema } from '../validators/authValidator.js';

// Generating a JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '48h',
    });
};

// Sign up a user
export const registerUser = async (req, res) => {
    // Validate input or incoming request data 
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { firstName, lastName, userName, email, password } = req.body;

    try {
        // Check if user already exists with email or username
        const userExists = await User.findOne({ $or: [{ email }, { userName }] });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Password hashing before going to DB
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating new user in the DB
        const user = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
        });

        // Sending back the user info and JWT token
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

// Login existing user
export const loginUser = async (req, res) => {
    // Validate input or incoming request data
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { identifier, password } = req.body;

    try {
        // find the user using either email or username
        const user = await User.findOne({
            $or: [{ email: identifier }, { userName: identifier }],
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // if login is successful, return user info and a JWT token
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
