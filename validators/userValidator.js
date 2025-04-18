
import Joi from 'joi';

export const updateUserSchema = Joi.object({
    fullName: Joi.string().min(2).max(30),
    userName: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    currency: Joi.string().valid('USD', 'EUR', 'GHS', 'GBP', 'NGN'), // add more if needed
    darkMode: Joi.boolean(),
    notifications: Joi.boolean(),
});
