import { setupWorker } from "msw/browser";
import { graphql, http, HttpResponse } from "msw";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

window.msw = {
  worker,
  graphql,
  http,
  HttpResponse,
};
