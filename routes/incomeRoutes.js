import express from 'express';
import {
    addIncome,
    getIncomes,
    deleteIncome,
    updateIncome,
} from '../controllers/incomeController.js';
// import protectRoute from '../middleware/protectRoute.js';

const incomeRouter = express.Router();

incomeRouter.post('/incomes', addIncome); // Add protectRoute when you work on the autheticators
incomeRouter.get('/incomes', getIncomes); // Add protectRoute when you work on the autheticators
incomeRouter.delete('/incomes/:id', deleteIncome); // Add protectRoute when you work on the autheticators
incomeRouter.put('/incomes:id', updateIncome) // Add protectRoute when you work on the autheticators

export default incomeRouter;
