import User from '../models/user.js';
import { updateUserSchema } from '../validators/userValidator.js';

export const getUserProfile = async (req, res) => {
    console.log("User from token:", req.user);
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch profile', error });
    }
};

export const updateUserSettings = async (req, res) => {
    // Validate incoming settings
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { darkMode, currency, notifications } = req.body;

        user.settings = {
            darkMode: darkMode ?? user.settings.darkMode,
            currency: currency ?? user.settings.currency,
            notifications: notifications ?? user.settings.notifications,
        };

        const updatedUser = await user.save();
        res.status(200).json(updatedUser.settings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update settings', error });
    }
};
