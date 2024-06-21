import { setupWorker } from "msw/browser";
import { graphql, http, HttpResponse } from "msw";
import { handlers as restHandlers } from "./handlers";
import { handlers } from "../../tests/createHandler";

export const worker = setupWorker(...handlers, ...restHandlers);

window.msw = {
  worker,
  graphql,
  http,
  HttpResponse,
};
