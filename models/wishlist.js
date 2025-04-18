import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    item: {
        type: String,
        required: true,
    },
    targetAmount: {
        type: Number,
        required: true,
    },
    savedAmount: {
        type: Number,
        default: 0,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    type: {
        type: String,
        enum: ['need', 'want'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
