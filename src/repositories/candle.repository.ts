import { Candle, CandleModel } from "@src/models/candle.model";

export interface ICandleRepository {
  save(candle: CandleModel): Promise<CandleModel>;
  findCandles(quantity: number): Promise<CandleModel[]>;
}
export default class CandleRepository implements ICandleRepository {
  async save(candle: CandleModel): Promise<CandleModel> {
    const newCandle = await Candle.create(candle);
    return newCandle;
  }
  async findCandles(quantity: number): Promise<CandleModel[]> {
    const qtt = quantity > 0 ? quantity : 10;
    const candles: CandleModel[] = await Candle.find()
      .sort({ _id: -1 })
      .limit(qtt);

    return candles;
  }
}
