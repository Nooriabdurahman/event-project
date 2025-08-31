import express from 'express';
import {
  getUsers,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
} from '@/module/auth/auth-services';
import { sendcode, verfycode, sendemail } from '@/module/contact/contact-services';
import { validateRegistration } from '@/module/auth/auth-services';
import { validateLogin } from '@/module/auth/auth-services';
import { validateEmail } from '@/module/auth/auth-services';
import { validateCode } from '@/module/auth/auth-services';


const router = express.Router();

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user profile (name, email, password)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */

router.put('/:id', updateUser);


/**
 * @swagger
 * /users:
 *   get:
 *     summmary: take all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: list of the users
 */
router.get('/', getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: make a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: the user that we have to create
 */
router.post('/', validateRegistration, createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: the login 
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: login complate
 */
router.post('/login', validateLogin, loginUser);

/**
 * @swagger
 * /users/send-code:
 *   post:
 *     summary: sending the code to user email
 *     tags: [Users]
 */
router.post('/send-code', validateEmail, sendcode);

/**
 * @swagger
 * /users/verify-code:
 *   post:
 *     summary: verify code that it is correct or not
 *     tags: [Users]
 */
router.post('/verify-code', validateCode, verfycode);

/**
 * @swagger
 * /users/send-email:
 *   post:
 *     summary: the route that the person send email to us
 *     tags: [Users]
 */
router.post('/send-email', sendemail);


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:id', deleteUser);





export default router;