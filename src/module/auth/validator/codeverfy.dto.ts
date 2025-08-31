import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';


// Code verification validation schema
const codeVerificationSchema = Joi.object({
  email: Joi.string()
    .email()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address'
    }),
  code: Joi.string()
    .length(6)
    .pattern(/^[A-Z0-9]+$/)
    .message('Code must be 6 characters containing only uppercase letters and numbers')
    .required()
    .messages({
      'string.empty': 'Verification code is required',
      'string.length': 'Verification code must be exactly 6 characters'
    })
});




export default 
  codeVerificationSchema
