import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="997231287821-63g5qbv7be2miqqm3eferc3p52h8vkb8.apps.googleusercontent.com">
    <AuthProvider>
      <App />
    </AuthProvider>
  </GoogleOAuthProvider>
);