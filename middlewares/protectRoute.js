import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// This middleware protects private routes by checking for a valid JWT
const protectRoute = async (req, res, next) => {
    try {
        // Check for Authorization header and extract the token (Bearer <token>)
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Not authorized, token missing' });
        }

        const token = authHeader.split(' ')[1]; // Get token from "Bearer token"

        // Verify token using the JWT_SECRET_KEY
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Fetch the user from the database (excluding password)
        req.user = await User.findById(decoded.userId).select('-password');

        // If everything is valid, continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Auth error:', error.message);

        return res.status(401).json({ message: 'Not authorized, invalid or expired token' });
    }
};

export default protectRoute;
