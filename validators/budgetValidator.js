import Joi from 'joi';

export const budgetValidator = Joi.object({
    category: Joi.string().required(),
    amount: Joi.number().required(),
    duration: Joi.string().valid('monthly', 'weekly').optional(),
});
