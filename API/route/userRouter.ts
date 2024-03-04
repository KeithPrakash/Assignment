
import express from 'express';
import * as userController from '../controller/userController'; 
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();
 


router.post('/login', userController.loginUser);
router.get('/getUsers', userController.getUsers)
 router.use(authenticateUser);
router.delete('/deleteUser/:id', userController.DeleteUser)
router.post('/createUser', userController.createUser);
// Protected routes 



export default router;