import { Request, Response } from 'express';
import Task, { ITask } from '../model/task';
import User, { IUser, UserRole } from '../model/user';
import mongoose from 'mongoose';

enum TaskStatus {
  Completed = 'completed',
  Approved = 'approved',
}

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskName, date, assignedUserId } = req.body;
    const userId = req.user?.userId;


    const user = await User.findById(userId);
    if (!user || user.role !== UserRole.Admin) {
      res.status(403).json({ error: 'Unauthorized. Only admins can create tasks.' });
      return;
    }

    
    const assignedUser = await User.findById(assignedUserId);
    if (!assignedUser) {
      res.status(404).json({ error: 'Assigned user not found' });
      return;
    }

   
    const newTask: ITask = new Task({
      taskName,
      date,
      assignedUserId,
      completed: false,
      approved: false,
    });

    // Save the task to the database
    await newTask.save();

    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;


    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    let tasks: ITask[];


    if (user.role === UserRole.Admin) {
      tasks = await Task.find();
    } else {
      tasks = await Task.find({ assignedUserId: userId });
    }
    res.status(200).json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId = req.params.id;
    const userId = req.user?.userId;

    const isValidObjectId = mongoose.Types.ObjectId.isValid(taskId);
    if (!isValidObjectId) {
      res.status(400).json({ error: 'Invalid taskId format' });
      return;
    }

    // Check  user exists
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }


    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

   
    if (user.role !== UserRole.Admin && task.assignedUserId.toString() !== userId) {
      res.status(403).json({ error: 'Unauthorized. You can only update your own tasks.' });
      return;
    }

    
    const { status } = req.body;

    switch (status) {
      case TaskStatus.Completed:
        task.completed = true;
        break;
      case TaskStatus.Approved:
        
        task.approved = true;
        break;
      default:
        res.status(400).json({ error: 'Invalid task status' });
        return;
    }

    await task.save();

    res.status(200).json({ message: 'Task status updated successfully' });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId = req.params.id;
    const userId = req.user?.userId;

    const isValidObjectId = mongoose.Types.ObjectId.isValid(taskId);
    if (!isValidObjectId) {
      res.status(400).json({ error: 'Invalid taskId format' });
      return;
    }


    const user = await User.findById(userId);
    if (!user || user.role !== UserRole.Admin) {
      res.status(403).json({ error: 'Unauthorized. Only admins can delete tasks.' });
      return;
    }


    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }


    await task.deleteOne();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getTasksByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const tasks = await Task.find({ assignedUserId: userId });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks by user ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};