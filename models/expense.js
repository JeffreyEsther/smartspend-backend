import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  merchant: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  report: {
    type: String, // e.g., "November_2022"
    required: true,
  },
  status: {
    type: String,
    enum: ['Submitted', 'Not submitted'],
    default: 'Not submitted',
  },
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
