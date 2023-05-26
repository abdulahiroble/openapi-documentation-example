import { Router } from 'express';
import userController from './userController.js';
import authJwt from '../service/middleware/authJwt.js';

const router = Router();

router.get('/ms/auth', (req, res) => {
    res.send("Welcome to the auth microservice!");
})
/**
 * @openapi
 * /ms/auth/users:
 *   post:
 *     description: Create a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               postal:
 *                 type: integer
 *               phone:
 *                 type: integer
 *               password:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               userRole:
 *                 type: string
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - address
 *               - postal
 *               - phone
 *               - password
 *     responses:
 *       200:
 *         description: Returns Object with response
 */
router.post('/ms/auth/users', userController.createUser);
/**
 * @openapi
 * /ms/auth/create/role:
 *   post:
 *     description: Create a user role
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *             required:
 *               - role
 *     responses:
 *       200:
 *         description: Returns Object with response data
 */
router.post('/ms/auth/create/role', userController.createRole);
/**
 * @openapi
 * /ms/auth/users:
 *   get:
 *     description: Get All users
 *     responses:
 *       200:
 *         description: Returns object with response data
 */
router.get('/ms/auth/users', userController.getAllUsers);
// This will be an URL on the frontend
router.get('/ms/auth/verify/account/:token', userController.verifyAccount);
router.get('/ms/auth/users/:id', userController.getUserById);
/**
 * @openapi
 * /ms/auth/users/{id}:
 *   delete:
 *     description: Delete a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns object with repsonse data
 */
router.delete('/ms/auth/user/:id', userController.deleteUser);
/**
 * @openapi
 * /ms/auth/user/{id}:
 *   put:
 *     description: Update a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               postal:
 *                 type: integer
 *               number:
 *                 type: integer
 *               password:
 *                 type: string
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - address
 *               - postal
 *               - number
 *               - password
 *     responses:
 *       200:
 *         description: Returns 200 OK
 */
router.put('/ms/auth/user/:id', userController.updateUser);

router.post('/ms/auth/login/verify', authJwt.verify, userController.verifyedUser)
router.post('/ms/auth/login', userController.login);

export default router