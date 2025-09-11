// models/PriceItem.ts
import mongoose from 'mongoose';

const priceItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  preis: { type: Number, required: true }
});

const PriceItem = mongoose.model('PriceItem', priceItemSchema);

export default PriceItem;
