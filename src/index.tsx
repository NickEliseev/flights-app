import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { extendTheme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = extendTheme({
  fonts: { body: "Roboto, sans-serif" },
  colors: { accent: "#ffb168", primary: "#0087c9" },
});
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
