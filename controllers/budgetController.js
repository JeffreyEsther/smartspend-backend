import Budget from '../models/budget.js';
import { budgetValidator } from '../validators/budgetValidator.js';

export const addBudget = async (req, res) => {
    const { error } = budgetValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const budget = await Budget.create({ ...req.body, user: req.user._id });
        res.status(201).json(budget);
    } catch (err) {
        res.status(500).json({ message: 'Failed to add budget' });
    }
};

export const getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ user: req.user._id });
        res.status(200).json(budgets);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch budgets' });
    }
};
