import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Auth0ProviderWithHistory from "./auth/auth0Provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0ProviderWithHistory>
    <App />
  </Auth0ProviderWithHistory>
);
