import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// Email validation schema (for sending codes)
const emailSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address'
    })
});



export default emailSchema