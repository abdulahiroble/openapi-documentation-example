import { Router } from 'express';
import userController from './userController.js';
import authJwt from '../service/middleware/authJwt.js';

const router = Router();

router.get('/', (req, res) => {
    res.send("Welcome to the auth API")
})

router.post('/api/users', userController.createUser);
router.post('/api/create/role', userController.createRole);
router.get('/api/users', userController.getAllUsers);
// TMP url, will be /api/verify in future
// This will be an URL on the frontend
router.get('/verify/account/:uuid', userController.verifyAccount);
router.get('/api/users/:id', userController.getUserById);
router.delete('/api/users/:id', userController.deleteUser);
router.put('/api/user', userController.updateUser);

  // Login
router.post('/api/login/verify', authJwt.verify, userController.verifyedUser)
router.post('/api/login', userController.login);

export default router