import { Channel, connect } from "amqplib";
import { Server } from "socket.io";
import * as http from "http";
import { CandleModel } from "@src/models/candle.model";
import { ICandleRepository } from "@src/repositories/candle.repository";

export class CandleMessageChannel {
  private channel: Channel;
  private QUEUE: string = "candles";
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
      const connection = await connect("amqp://dev:senhadev@127.0.0.1:5672");
      this.channel = await connection.createChannel();
      this.channel.assertQueue(this.QUEUE);
    } catch (err: any) {
      console.log(err.message);
    }
  }
  async messageConsumer() {
    await this._createMessageChannel();
    this.channel.consume(this.QUEUE, async (msg) => {
      if (msg) {
        const candle: CandleModel = JSON.parse(msg.content.toString());
        this.channel.ack(msg);
        await this.repo.save(candle);
        this._io.emit("newCandle", candle);
      }
    });
  }
}
