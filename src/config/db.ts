import { connect as mongooseConnect, connection } from "mongoose";

export const connect = async (): Promise<void> => {
  await mongooseConnect("mongodb://127.0.0.1:27017/candles");
  console.log("Connected to MONGODB database");
};

export const close = async (): Promise<void> => connection.close();
