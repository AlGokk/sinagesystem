import mongoose from 'mongoose';
import { Page } from '../models/Page';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || '';


const dummyPage = new Page({
  title: 'Standard Preisliste',
  category: 'Preisliste',
  content: {
    Pizzen: [
      { name: "Margherita", preis: 12.5 },
      { name: "Salami", preis: 14.0 },
      { name: "Prosciutto", preis: 15.0 },
      { name: "Funghi", preis: 13.5 },
      { name: "Quattro Stagioni", preis: 16.0 },
      { name: "Diavola", preis: 15.5 },
      { name: "Vegetarisch", preis: 14.0 },
      { name: "Tonno", preis: 16.5 },
      { name: "Hawaii", preis: 15.0 },
      { name: "Calzone", preis: 17.0 },
    ],
    Nudle: [
      { name: "Spaghetti Bolognese", preis: 14.0 },
      { name: "Penne Arrabiata", preis: 13.5 },
      { name: "Tagliatelle al Pesto", preis: 15.0 },
      { name: "Lasagne", preis: 16.0 },
      { name: "Tortellini panna", preis: 15.5 },
    ],
    Kaltgetränk: [
      { name: "Cola", preis: 4.5 },
      { name: "Orangina", preis: 4.5 },
      { name: "Mineralwasser", preis: 3.5 },
      { name: "Apfelsaft", preis: 4.0 },
      { name: "Eistee", preis: 4.5 },
    ],
    Café: [
      { name: "Espresso", preis: 3.5 },
      { name: "Cappuccino", preis: 4.5 },
      { name: "Latte Macchiato", preis: 4.5 },
      { name: "Schale Kaffee", preis: 4.0 },
    ],
  },
});

async function seedDummyPage() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Verbunden mit MongoDB');

    // Optional: Alte Preisliste löschen
    await Page.deleteMany({ category: 'Preisliste' });

    // Dummy-Seite speichern
    const savedPage = await dummyPage.save();
    console.log('Dummy Preisliste gespeichert mit ID:', savedPage._id);

    await mongoose.disconnect();
  } catch (err) {
    console.error('Fehler beim Speichern der Dummydaten:', err);
  }
}

seedDummyPage();
