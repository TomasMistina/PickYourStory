import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { MobileProvider } from "./mobile/MobileContext";

const basename = "/PickYourStory";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={basename}>
        <MobileProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </MobileProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
