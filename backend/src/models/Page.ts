

import { Schema, model, InferSchemaType } from 'mongoose';

const contentItemSchema = new Schema({
  name: { type: String, required: true },
  preis: { type: Number, required: true },
}, {_id: false});

const pageSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
 content: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true });

type IPage = InferSchemaType<typeof pageSchema>;

const Page = model<IPage>('Page', pageSchema);

export { Page, IPage };

