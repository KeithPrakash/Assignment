import mongoose, {  Schema, model } from 'mongoose';

export interface ITask extends mongoose.Document {
  taskName: string;
  date: Date;
  assignedUserId:  mongoose.Schema.Types.ObjectId;
  completed: boolean;
  approved: boolean;
}

const taskSchema = new Schema<ITask>({
  taskName: { type: String, required: true },
  date: { type: Date, required: true },
  assignedUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  completed: { type: Boolean, default: false },
  approved: { type: Boolean, default: false },
});

export default mongoose.model<ITask>('Task', taskSchema);