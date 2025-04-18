import express from 'express';
import {
    addIncome,
    getIncomes,
    deleteIncome,
    updateIncome,
} from '../controllers/incomeController.js';
import protectRoute from '../middlewares/protectRoute.js';

const incomeRouter = express.Router();

incomeRouter.post('/income', protectRoute, addIncome); // Add protectRoute when you work on the autheticators
incomeRouter.get('/incomes', protectRoute, getIncomes); // Add protectRoute when you work on the autheticators
incomeRouter.delete('/income/:id', protectRoute, deleteIncome); // Add protectRoute when you work on the autheticators
incomeRouter.put('/income/:id', protectRoute, updateIncome) // Add protectRoute when you work on the autheticators

export default incomeRouter; 