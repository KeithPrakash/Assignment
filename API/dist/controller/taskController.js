"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksByUser = exports.deleteTask = exports.updateTaskStatus = exports.getTasks = exports.createTask = void 0;
const task_1 = __importDefault(require("../model/task"));
const user_1 = __importStar(require("../model/user"));
const mongoose_1 = __importDefault(require("mongoose"));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["Completed"] = "completed";
    TaskStatus["Approved"] = "approved";
})(TaskStatus || (TaskStatus = {}));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { taskName, date, assignedUserId } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const user = yield user_1.default.findById(userId);
        if (!user || user.role !== user_1.UserRole.Admin) {
            res.status(403).json({ error: 'Unauthorized. Only admins can create tasks.' });
            return;
        }
        const assignedUser = yield user_1.default.findById(assignedUserId);
        if (!assignedUser) {
            res.status(404).json({ error: 'Assigned user not found' });
            return;
        }
        const newTask = new task_1.default({
            taskName,
            date,
            assignedUserId,
            completed: false,
            approved: false,
        });
        // Save the task to the database
        yield newTask.save();
        res.status(201).json({ message: 'Task created successfully' });
    }
    catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
        const user = yield user_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        let tasks;
        if (user.role === user_1.UserRole.Admin) {
            tasks = yield task_1.default.find();
        }
        else {
            tasks = yield task_1.default.find({ assignedUserId: userId });
        }
        res.status(200).json({ tasks });
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getTasks = getTasks;
const updateTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const taskId = req.params.id;
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId;
        const isValidObjectId = mongoose_1.default.Types.ObjectId.isValid(taskId);
        if (!isValidObjectId) {
            res.status(400).json({ error: 'Invalid taskId format' });
            return;
        }
        // Check  user exists
        const user = yield user_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const task = yield task_1.default.findById(taskId);
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        if (user.role !== user_1.UserRole.Admin && task.assignedUserId.toString() !== userId) {
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
        yield task.save();
        res.status(200).json({ message: 'Task status updated successfully' });
    }
    catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.updateTaskStatus = updateTaskStatus;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const taskId = req.params.id;
        const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.userId;
        const isValidObjectId = mongoose_1.default.Types.ObjectId.isValid(taskId);
        if (!isValidObjectId) {
            res.status(400).json({ error: 'Invalid taskId format' });
            return;
        }
        const user = yield user_1.default.findById(userId);
        if (!user || user.role !== user_1.UserRole.Admin) {
            res.status(403).json({ error: 'Unauthorized. Only admins can delete tasks.' });
            return;
        }
        const task = yield task_1.default.findById(taskId);
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        yield task.deleteOne();
        res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deleteTask = deleteTask;
const getTasksByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const tasks = yield task_1.default.find({ assignedUserId: userId });
        res.status(200).json({ tasks });
    }
    catch (error) {
        console.error('Error fetching tasks by user ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getTasksByUser = getTasksByUser;
