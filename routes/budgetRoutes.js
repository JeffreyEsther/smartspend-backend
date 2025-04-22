import express from 'express';
import { addBudget, getBudgets } from '../controllers/budgetController.js';
import protectRoute from '../middlewares/protectRoute.js';

const budgetRouter = express.Router();

budgetRouter.post('/', protectRoute, addBudget);
budgetRouter.get('/', protectRoute, getBudgets);

export default budgetRouter;
