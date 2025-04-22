import Expense from '../models/expense.js';
import { expenseValidator } from '../validators/expenseValidator.js';

export const addExpense = async (req, res) => {
    const { error } = expenseValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const expense = await Expense.create({ ...req.body, user: req.user._id });
        res.status(201).json(expense);
    } catch (err) {
        res.status(500).json({ message: 'Failed to add expense' });
    }
};

export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch expenses' });
    }
};
