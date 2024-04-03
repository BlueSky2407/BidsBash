import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import { App as AntdApp } from "antd";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AntdApp>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: "#457b9d",
                colorPrimaryHover: "#457b9d",
                borderRadius: 2,
              },
            },
            token: {
              borderRadius: 2,
              colorPrimary: "#457b9d",
            },
          }}
        >
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </AntdApp>
  </React.StrictMode>
);

reportWebVitals();
