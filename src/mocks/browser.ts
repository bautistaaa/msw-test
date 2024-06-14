import { setupWorker } from "msw/browser";
import { http, HttpResponse } from "msw";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

window.msw = {
  worker,
  http,
  HttpResponse,
};
