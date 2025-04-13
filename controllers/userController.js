import User from '../models/user.js';

export const getUserProfile = async (req, res) => {
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
