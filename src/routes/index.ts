import { Router } from "express";
import { CandlesRoutes } from "./candles.routes";

const router = Router();

router.use(new CandlesRoutes().router);

export { router };
