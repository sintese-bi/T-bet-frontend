import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.tsx";
import { ToastContainer } from "react-toastify";

import { Provider } from "react-redux";
import store from "./redux/store";

import { MantineProvider } from "@mantine/core";
import theme from "./styles/mantine";

import "react-toastify/dist/ReactToastify.css";
import "@mantine/core/styles.css";
import "./index.css";
import "swiper/css";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <ToastContainer />
        <Router />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
