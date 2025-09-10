"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helloWorld_1 = __importDefault(require("./routes/helloWorld"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', helloWorld_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '../../build/ui')));
app.get('/*splat', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../../build/ui', 'index.html'));
});
console.log('----------------------');
console.log(process.env.MONGODB_URI);
console.log('----------------------');
mongoose_1.default.connect(process.env.MONGODB_URI || '')
    .then(() => console.log('Connected to MongoDB'))
    .catch(console.error);
exports.default = app;
