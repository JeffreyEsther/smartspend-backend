import Joi from 'joi';

// Registration validation
export const registerSchema = Joi.object({
    fullName: Joi.string().messages({
        'any.required': 'Full name is required',
        'string.base': 'Full name must be a string',
    }),

    userName: Joi.string().required().alphanum().min(3).max(30).messages({
        'any.required': 'Username is required',
        'string.alphanum': 'Username must be alphanumeric',
        'string.min': 'Username must be at least 3 characters',
        'string.max': 'Username must not exceed 30 characters',
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Email must be valid',
    }),
    password: Joi.string().min(6).required().messages({
        'any.required': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
    }),
});

// Login validation (identifier = username or email)
export const loginSchema = Joi.object({
    identifier: Joi.string().required().messages({
        'any.required': 'Username or email is required',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
    }),
});
