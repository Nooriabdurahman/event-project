import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './module/auth/auth-route';
import eventRoutes from './module/event/event-route';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/users', userRoutes);
app.use('/events', eventRoutes);

export default app;
