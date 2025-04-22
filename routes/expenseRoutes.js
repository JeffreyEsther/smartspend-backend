import express from 'express';
import { addExpense, getExpenses } from '../controllers/expenseController.js';
import protectRoute from '../middlewares/protectRoute.js';

const expenseRouter = express.Router();

expenseRouter.post('/', protectRoute, addExpense);
expenseRouter.get('/', protectRoute, getExpenses);

export default expenseRouter;
