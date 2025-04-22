import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ["Salary", "Business", "Freelance", "Investments", "Rental Income", "Government Benefits", "Gifts/Support", "Other"],
        default: 'Salary'
    },
    
    date: {
        type: Date,
        default: Date.now,
    },
});

const Income = mongoose.model('Income', incomeSchema);

export default Income;
