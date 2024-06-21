import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql.ts";

async function enableMocking() {
  const { worker } = await import("./mocks/setupWorker");

  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <App />
        </Suspense>
      </ApolloProvider>
    </React.StrictMode>,
  );
});
