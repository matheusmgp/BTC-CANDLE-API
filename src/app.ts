import { SetupServer } from "./server";
import { config } from "dotenv";
config();
(async (): Promise<void> => {
  const server = new SetupServer(3333);
  server.init();
})();
