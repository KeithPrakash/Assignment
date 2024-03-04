import express from 'express'
import * as taskController from "../controller/taskController"
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router()
router.get('/getTasksByUser/:userId',taskController.getTasksByUser )
router.use(authenticateUser); 
router.post('/create-task/' ,taskController.createTask)
router.delete('/delete' ,taskController.deleteTask)
router.get('/get-tasks' ,taskController.getTasks)
router.patch('/update/:id',taskController.updateTaskStatus)


export default router;