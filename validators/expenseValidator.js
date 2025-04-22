import Joi from 'joi';

export const expenseValidator = Joi.object({
    category: Joi.string().required(),
    amount: Joi.number().required(),
    description: Joi.string().optional(),
    date: Joi.date().optional(),
});
