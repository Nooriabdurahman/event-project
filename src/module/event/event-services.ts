import { Request, Response } from 'express';
import prisma from '@/common/config/database/prisma';
import { convertToBase64 } from '@/common/utils/base64';
import eventIdSchema from './validator/eventId-schema';
import eventSchema from './validator/eventschema';


export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await prisma.event.findMany();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching events' });
  }
};

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  const body = req.body;
  try {
    const newEvent = await prisma.event.create({
      data: {
        myFile: convertToBase64(body.myFile),
        eventTitle: body.eventTitle,
        description: body.description,
        category: body.category,
        date: body.date,
        time: body.time,
        location: body.location,
        organizerName: body.organizerName,
        contactInformation: body.contactInformation
      }
    });
    res.status(201).json({ msg: 'New event created', event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating the event' });
  }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  const eventId = parseInt(req.params.id);
  try {
    const deletedEvent = await prisma.event.delete({
      where: { id: eventId }
    });
    res.json({ msg: 'Event deleted successfully', event: deletedEvent });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error deleting the event' });
  }
};

export const validateEventId = (req: Request, res: Response, next: Function): void => {
  const { error } = eventIdSchema.validate({ id: parseInt(req.params.id) }, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    
    res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors
    });
    return;
  }
  
  next();
};



// Validation middleware for creating events
export const validateEventCreation = (req: Request, res: Response, next: Function): void => {
  const { error } = eventSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    
    res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors
    });
    return;
  }
  
  next();
};
