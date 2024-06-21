import type { graphql, http, HttpResponse } from "msw";
import type { SetupWorker } from "msw/browser";

declare global {
  interface Window {
    msw: {
      worker: SetupWorker;
      graphql: graphql;
      http: http;
      HttpResponse: typeof HttpResponse;
    };
  }
}
