import { Channel, connect } from "amqplib";
import { Server } from "socket.io";
import * as http from "http";
import { CandleModel } from "@src/models/candle.model";
import { ICandleRepository } from "@src/repositories/candle.repository";

export class CandleMessageChannel {
  private channel: Channel;
  private _io: Server;

  constructor(server: http.Server, private readonly repo: ICandleRepository) {
    this._io = new Server(server, {
      cors: {
        origin: process.env.SOCKET_CLIENT_SERVER,
        methods: ["GET", "POST"],
      },
    });

    this._io.on("connection", () => console.log("Web socket connected"));
  }

  private async _createMessageChannel() {
    try {
      const connection = await connect(
        process.env.AMQP_SERVER ?? "amqp://dev:senhadev@127.0.0.1:5672"
      );
      this.channel = await connection.createChannel();
      this.channel.assertQueue(process.env.QUEUE_NAME ?? "candles");
    } catch (err: any) {
      console.log(err.message);
    }
  }
  async messageConsumer() {
    await this._createMessageChannel();
    this.channel.consume(process.env.QUEUE_NAME ?? "candles", async (msg) => {
      if (msg) {
        const candle: CandleModel = JSON.parse(msg.content.toString());
        console.log("-----------------------------------");
        console.log("Message received successfully", candle);
        this.channel.ack(msg);
        await this.repo.save(candle);
        this._io.emit("newCandle", candle);
      }
    });
  }
}
