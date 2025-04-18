import Income from '../models/income.js';
import { incomeSchema } from '../validators/incomeValidator.js';

// Add a new income
export const addIncome = async (req, res) => {
  // Validate incoming data
  const { error } = incomeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { amount, source, description, date } = req.body;

  try {
    const income = await Income.create({
      user: req.user._id,
      amount,
      source,
      description,
      date,
    });

    res.status(201).json(income);
  } catch (error) {
    console.error('Error adding income:', error.message);
    res.status(500).json({ message: 'Failed to add income' });
  }
};

// Get all incomes for the logged-in user
export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    console.error('Error fetching incomes:', error.message);
    res.status(500).json({ message: 'Failed to fetch incomes' });
  }
};

// Delete an income
export const deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Income.findOneAndDelete({ _id: id, user: req.user._id });

    if (!deleted) {
      return res.status(404).json({ message: 'Income not found' });
    }

    res.status(200).json({ message: 'Income deleted successfully' });
  } catch (error) {
    console.error('Error deleting income:', error.message);
    res.status(500).json({ message: 'Failed to delete income' });
  }
};

// Update an income
export const updateIncome = async (req, res) => {
  // Validate updated data
  const { error } = incomeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { id } = req.params;
  const { amount, source, description, date } = req.body;

  try {
    const income = await Income.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { amount, source, description, date },
      { new: true }
    );

    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    res.status(200).json(income);
  } catch (error) {
    console.error('Error updating income:', error.message);
    res.status(500).json({ message: 'Failed to update income' });
  }
};
