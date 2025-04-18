import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    description: String,
    date: {
        type: Date,
        default: Date.now,
    },
});

const Income = mongoose.model('Income', incomeSchema);

export default Income;
