import express from 'express';
import { addBudget, getBudgets } from '../controllers/budgetController.js';
import protectRoute from '../middlewares/protectRoute.js';

const budgetRouter = express.Router();

budgetRouter.post('/budget', protectRoute, addBudget);
budgetRouter.get('/budgets', protectRoute, getBudgets);

export default budgetRouter;
