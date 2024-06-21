import { setupServer } from "msw/node";
import { handlers } from "./createHandler";

type SetupServer = ReturnType<typeof setupServer>;

export let api: SetupServer;

export function initialize(): SetupServer {
  const server = setupServer(...handlers);
  server.listen({ onUnhandledRequest: "bypass" });
  api = server;
  return server;
}

export function getWorker(): SetupServer {
  if (api === undefined) {
    throw new Error(
      `[MSW] Failed to retrieve the worker: no active worker found. Did you forget to call "initialize"?`,
    );
  }

  return api;
}
