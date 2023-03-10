/*import CandleController from "@src/controllers/candle.controller";
import { Request, Response, Router } from "express";

export const routes = Router();

const controller = new CandleController();

routes.get("/:quantity", async (req: Request, res: Response) => {
  const quantity = parseInt(req.params.quantity);
  const candles = await controller.findCandles(quantity);

  res.status(200).json(candles);
});
*/

import CandleController from "@src/controllers/candle.controller";
import CandleRepository from "@src/repositories/candle.repository";
import express, { Request, Response, Router } from "express";

export class CandlesRoutes {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    const controller = new CandleController(new CandleRepository());
    this.router.get("/:quantity", async (req: Request, res: Response) => {
      const quantity = parseInt(req.params.quantity);
      const candles = await controller.findCandles(quantity);

      res.status(200).json(candles);
    });
  }
}
