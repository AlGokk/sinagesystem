import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Importiere die Seitenverwaltung-Routen (muss in deinem Projekt unter ./routes/pages existieren)
import pagesRouter from './routes/pages';



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API Endpoints:
/**
 * Seitenverwaltung API unter /api/pages
 */
app.use('/api/pages', pagesRouter);

// Falls andere APIs bestehen bleiben können sie auch noch unter '/api/...'
// Beispiel: app.use('/api/helloWorld', helloWorldRouter);


// Statische UI-Dateien ausliefern (React Build)
app.use(express.static(path.join(__dirname, '../../build/ui')));

// Für alle anderen Routen (Client Routing im React) gib index.html zurück
app.get('/*splat', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../build/ui', 'index.html'));
});

// MongoDB verbinden
const mongoUri = process.env.MONGODB_URI || '';

console.log('MongoDB URI:', mongoUri);

mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

export default app;
