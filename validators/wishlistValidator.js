import Joi from 'joi';

export const wishlistSchema = Joi.object({
    item: Joi.string().required(),
    targetAmount: Joi.number().required(),
    savedAmount: Joi.number().min(0).default(0),
    priority: Joi.string().valid('low', 'medium', 'high').default('medium')
});
