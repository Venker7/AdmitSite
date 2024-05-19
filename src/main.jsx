import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Home } from "./Components/Home";
import { ChakraProvider } from "@chakra-ui/react";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { Man } from "@mui/icons-material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
