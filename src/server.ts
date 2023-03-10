/*import "./util/module-alias";
import { config } from "dotenv";
import { app } from "./app";
import { connect, close } from "./config/db";
import { CandleMessageChannel } from "./messages/candle-messages-channel";
import CandleRepository from "./repositories/candle.repository";

config();

const createServer = async () => {
  const PORT = process.env.PORT;

  await connect();
  const server = app.listen(PORT, () => {
    console.info(`Application running on port ${PORT}`);
  });

  const candleMsgChannel = new CandleMessageChannel(
    server,
    new CandleRepository()
  );
  await candleMsgChannel.messageConsumer();

  process.on("SIGNT", async () => {
    await close();
    console.info("Connection and server shutted");
  });
};

createServer();*/
import "./util/module-alias";
import express, { Application } from "express";
import { router } from "./routes";
import { connect, close } from "./config/db";
import logger from "morgan";

import { CandleMessageChannel } from "./messages/candle-messages-channel";
import CandleRepository from "./repositories/candle.repository";
export class SetupServer {
  constructor(private port = 3333, private app = express()) {}

  public async init(): Promise<void> {
    this.app.use(express.json());
    this.app.use(logger("dev"));
    this.start();
    this.setRoutes();
    await this.databaseSetup();
  }
  public async start(): Promise<void> {
    const server = this.app.listen(this.port, () => {
      console.info("API running on port: " + this.port);
    });
    const candleMsgChannel = new CandleMessageChannel(
      server,
      new CandleRepository()
    );
    await candleMsgChannel.messageConsumer();

    process.on("SIGNT", async () => {
      await close();
      console.info("Connection and server shutted");
    });
  }
  public setRoutes(): void {
    this.app.use("/v1/candles", router);
  }
  private async databaseSetup(): Promise<void> {
    await connect();
  }
  public async close(): Promise<void> {
    await close();
  }
  public getApp(): Application {
    return this.app;
  }
}
