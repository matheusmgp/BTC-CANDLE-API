import { ICandleRepository } from "@src/repositories/candle.repository";
import { CandleModel } from "../models/candle.model";

export default class CandleController {
  constructor(private readonly repo: ICandleRepository) {}

  async findCandles(quantity: number): Promise<CandleModel[]> {
    return this.repo.findCandles(quantity);
  }
}
