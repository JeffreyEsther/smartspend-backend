import express from 'express';
import { addExpense, getExpenses } from '../controllers/expenseController.js';
import protectRoute from '../middlewares/protectRoute.js';

const expenseRouter = express.Router();

expenseRouter.post('/expense', protectRoute, addExpense);
expenseRouter.get('/expenses', protectRoute, getExpenses);

export default expenseRouter;
