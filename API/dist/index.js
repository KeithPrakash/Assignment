"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
dotenv_1.default.config();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
// ========== import routes
const userRouter_1 = __importDefault(require("./route/userRouter"));
const taskRouter_1 = __importDefault(require("./route/taskRouter"));
mongoose_1.default
    .connect("mongodb://127.0.0.1:27017/TaskApp")
    .then(() => {
    app.listen(port, () => {
        console.log(`server is up and running on ${port}`);
    });
})
    .catch((err) => {
    console.log(err);
});
app.post("/", (req, res) => {
    console.log(req.body);
    res.json({ data: "it works" });
});
app.use("/api/v1/user", userRouter_1.default);
app.use("/api/v1/task", taskRouter_1.default);
