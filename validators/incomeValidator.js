import Joi from 'joi';

export const incomeSchema = Joi.object({
  amount: Joi.number().required().positive().messages({
    'any.required': 'Amount is required',
    'number.base': 'Amount must be a number',
    'number.positive': 'Amount must be a positive number',
  }),
  source: Joi.string().required().messages({
    'any.required': 'Source is required',
    'string.base': 'Source must be a string',
  }),
  category: Joi.string().valid("Salary", "Business", "Freelance", "Investments", "Rental Income", "Government Benefits", "Gifts/Support", "Other").default('salary'),
  date: Joi.date().optional(),
});
