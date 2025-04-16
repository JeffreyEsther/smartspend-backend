import express from 'express';
import {
    getUserProfile,
    updateUserSettings,
} from '../controllers/userController.js';
import protectRoute  from '../middlewares/protectRoute.js';

const userRouter = express.Router();

// Get logged-in user's profile
userRouter.get('/profile', protectRoute, getUserProfile);

// Update user settings (darkMode, currency, notifications)
userRouter.put('/settings', protectRoute, updateUserSettings);

export default userRouter;
