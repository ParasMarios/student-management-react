import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import App from "./App";
import config from "./config";

const container = document.getElementById("root");
const root = createRoot(container);

const axiosInstance = axios.create({
  baseURL: config.backendURL, // Use the configured backend URL
});

root.render(
  <BrowserRouter>
    <App axiosInstance={axiosInstance} />
  </BrowserRouter>
);
