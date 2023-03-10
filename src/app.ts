import { SetupServer } from "./server";

(async (): Promise<void> => {
  const server = new SetupServer(3333);
  server.init();
})();
