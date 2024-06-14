import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/greeting", () => {
    return HttpResponse.json("Hello");
  }),
];
