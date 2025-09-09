import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/helloWorld';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);
console.log('----------------------')
console.log(process.env.MONGODB_URI)
console.log('----------------------')
mongoose.connect(process.env.MONGODB_URI || '')
  .then(() => console.log('Connected to MongoDB'))
  .catch(console.error);

export default app;



