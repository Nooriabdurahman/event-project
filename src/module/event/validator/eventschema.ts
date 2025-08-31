import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';


const eventSchema = Joi.object({
  eventTitle: Joi.string()
    .min(5)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Event title is required',
      'string.min': 'Event title must be at least 5 characters long',
      'string.max': 'Event title cannot exceed 100 characters'
    }),
  description: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.empty': 'Description is required',
      'string.min': 'Description must be at least 10 characters long',
      'string.max': 'Description cannot exceed 1000 characters'
    }),
  category: Joi.string()
    .valid('Conference', 'Workshop', 'Seminar', 'Webinar', 'Networking', 'Other')
    .required()
    .messages({
      'string.empty': 'Category is required',
      'any.only': 'Please select a valid category'
    }),
  date: Joi.date()
    .min('now')
    .required()
    .messages({
      'date.base': 'Please provide a valid date',
      'date.min': 'Event date must be in the future',
      'any.required': 'Date is required'
    }),
  time: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .message('Please provide a valid time in HH:MM format')
    .required()
    .messages({
      'string.empty': 'Time is required'
    }),
  location: Joi.string()
    .min(5)
    .max(200)
    .required()
    .messages({
      'string.empty': 'Location is required',
      'string.min': 'Location must be at least 5 characters long',
      'string.max': 'Location cannot exceed 200 characters'
    }),
  organizerName: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .message('Organizer name can only contain letters and spaces')
    .required()
    .messages({
      'string.empty': 'Organizer name is required',
      'string.min': 'Organizer name must be at least 2 characters long',
      'string.max': 'Organizer name cannot exceed 50 characters'
    }),
  contactInformation: Joi.string()
    .min(5)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Contact information is required',
      'string.min': 'Contact information must be at least 5 characters long',
      'string.max': 'Contact information cannot exceed 100 characters'
    }),
  myFile: Joi.string()
    .required()
    .messages({
      'string.empty': 'Image is required'
    })
});



// Validation middleware for event ID (for delete operations)

export default  eventSchema

