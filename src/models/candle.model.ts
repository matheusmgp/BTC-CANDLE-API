import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface CandleModel extends Document {
  currency: string;
  open: number;
  close: number;
  high: number;
  low: number;
  color: string;
  finalDateTime: Date;
}
const schema = new Schema<CandleModel>(
  {
    currency: { type: String, required: true },
    open: { type: Number, required: true },
    close: { type: Number, required: true },
    high: { type: Number, required: true },
    low: { type: Number, required: true },
    color: { type: String, required: true },
    finalDateTime: { type: Date, required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const Candle: Model<CandleModel> = mongoose.model<CandleModel>(
  "Candle",
  schema
);

//export const CandleModel = model<Candle>("Candle", schema);
