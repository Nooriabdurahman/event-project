import express from 'express';
import { getEvents, createEvent, deleteEvent } from '@/module/event/event-services';
import {validateEventCreation} from '@/module/event/event-services';
import { validateEventId } from '@/module/event/event-services';

const router = express.Router();

/**
 * @swagger
 * /events:
 *   get:
 *     summary: to take all the events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: that show all the events in our website
 */
router.get('/', getEvents);

/**
 * @swagger
 * /events/uploads:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               myFile:
 *                 type: string
 *                 description: Base64 encoded file
 *               eventTitle:
 *                 type: string
 *                 description: Title of the event
 *               description:
 *                 type: string
 *                 description: Description of the event
 *               category:
 *                 type: string
 *                 description: Category of the event
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the event
 *               time:
 *                 type: string
 *                 description: Time of the event
 *               location:
 *                 type: string
 *                 description: Location of the event
 *               organizerName:
 *                 type: string
 *                 description: Name of the organizer
 *               contactInformation:
 *                 type: string
 *                 description: Contact information
 *     responses:
 *       201:
 *         description: Event created successfully
 */
router.post('/uploads', validateEventCreation, createEvent);


/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: to delete an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the event to delete
 *     responses:
 *       200:
 *         description: event deleted successfully
 */

router.delete('/:id', validateEventId, deleteEvent);

export default router;