import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    duration: {
        type: String, // e.g., 'monthly', 'weekly'
        default: 'monthly',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Budget = mongoose.model('Budget', budgetSchema);
export default Budget;
