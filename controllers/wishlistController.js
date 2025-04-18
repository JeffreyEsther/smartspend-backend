import Wishlist from '../models/wishlist.js';
import { wishlistSchema } from '../validators/wishlistValidator.js';

// Add a wishlist item
export const addWishlistItem = async (req, res) => {
    const { error, value } = wishlistSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: 'Invalid input', error: error.details });
    }
    // const { item, targetAmount, savedAmount, priority, type } = req.body;

    try {
        const wishlistItem = await Wishlist.create({
            user: req.user._id,
            ...value,
        });

        res.status(201).json(wishlistItem);
    } catch (err) {
        res.status(500).json({ message: 'Failed to add item', error: err.message });
    }
};

// Get all wishlist items
export const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(wishlist);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch wishlist', error: err.message });
    }
};

// Update wishlist item
export const updateWishlistItem = async (req, res) => {
    const { id } = req.params;
    const { error, value } = wishlistSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: 'Invalid input', error: error.details });
    }

    try {
        const updated = await Wishlist.findOneAndUpdate(
            { _id: id, user: req.user._id },
            value,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update item', error: err.message });
    }
};

// Delete wishlist item
export const deleteWishlistItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Wishlist.findOneAndDelete({ _id: id, user: req.user._id });

        if (!deleted) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Wishlist item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete item', error: err.message });
    }
};
