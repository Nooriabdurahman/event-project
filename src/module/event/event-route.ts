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
 *     summary: make a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: to make a new event
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