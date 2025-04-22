import Joi from 'joi';

export const expenseValidator = Joi.object({
    date: Joi.date().required(),
    details: Joi.string().required(),
    merchant: Joi.string().required(),
    amount: Joi.number().required(),
    report: Joi.string().required(),
    status: Joi.string().valid('Submitted', 'Not submitted').optional(),
});
