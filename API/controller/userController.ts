import { Request, Response } from 'express';
import User ,{IUser, UserRole} from '../model/user';
import bcrypt from 'bcrypt';
import jwt,{Secret} from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
// Secret key for JWT (this should be kept secure in production)
const JWT_SECRET:Secret = '5264859595595695616425595959569595995955925988484154689498148486484898948484568446886'

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if the user already exists with the given email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'User with this email already exists' });
      return;
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser: IUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // JWT token
      const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET , {
        expiresIn: '1h', 
      });

      res.status(200).json({ token ,user: { userId: user._id, email: user.email ,role:user.role , name:user.firstName} });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json({ data: users, message: "Retrieved Users Successfully" });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
};


export const DeleteUser =async(req:Request,res:Response):Promise<Response | void > =>{
  const userId = req.params.id;

  try {
 
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

