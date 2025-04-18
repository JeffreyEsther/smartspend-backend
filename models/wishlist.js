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
    progress: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Automatically calculate progress before saving
wishlistSchema.pre('save', function (next) {
    this.progress = Math.min((this.savedAmount / this.targetAmount) * 100, 100);
    next();
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
