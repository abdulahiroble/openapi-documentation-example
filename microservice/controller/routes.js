import { Router } from 'express';
import userController from './userController.js';
import authJwt from '../service/middleware/authJwt.js';

const router = Router();

router.get('/ms/auth', (req, res) => {
    res.send("Welcome to the auth microservice!");
})

router.post('/ms/auth/users', userController.createUser);
router.post('/ms/auth/create/role', userController.createRole);
router.get('/ms/auth/users', userController.getAllUsers);
// TMP url, will be /ms/auth/verify in future
// This will be an URL on the frontend
router.get('/verify/account/:uuid', userController.verifyAccount);
router.get('/ms/auth/users/:id', userController.getUserById);
router.delete('/ms/auth/users/:id', userController.deleteUser);
router.put('/ms/auth/user', userController.updateUser);

  // Login
router.post('/ms/auth/login/verify', authJwt.verify, userController.verifyedUser)
router.post('/ms/auth/login', userController.login);

export default router