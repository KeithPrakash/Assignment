import mongoose, { Schema, model } from 'mongoose';


export enum UserRole {
  Admin = 'admin',
  User = 'user',
}


  export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true ,unique:true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

                                
export default mongoose.model <IUser>('User', userSchema); 